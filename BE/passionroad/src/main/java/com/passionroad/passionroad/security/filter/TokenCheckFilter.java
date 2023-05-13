package com.passionroad.passionroad.security.filter;

import com.passionroad.passionroad.security.APIUserDetailsService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;
import com.passionroad.passionroad.security.exception.AccessTokenException;
import com.passionroad.passionroad.util.JWTUtil;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@Log4j2
@RequiredArgsConstructor
public class TokenCheckFilter extends OncePerRequestFilter {
    /*
    * 목적 : 모든 /api/... 경로에 접근하는 요청을 검사
    * 1. 토큰이 맞는지 확인
    * 2. 토큰이 맞으면 정상적인지 확인
    * 3. 정상적인 토큰이 맞으면 기한이 만료됐는지 확인
    * */

    private final JWTUtil jwtUtil;
    private final APIUserDetailsService apiUserDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException{

        String path = request.getRequestURI();  // 요청 받은 주소 반환
        String httpMethod = request.getMethod();    // 요청 메소드
        List<String> blackList = List.of("POST", "PUT", "DELETE");  // 검사할 메소드 리스트

        /*
        1. 경로가 /api/.. 로 시작하지 않으면 검사 x
        2. 경로는 /api/.. 로 시작하지만 POST, PUT, DELETE 가 아니면 검사 x
        */
        if(!path.startsWith("/api/") || !blackList.contains(httpMethod)){

            log.info("Token Check Passed.................");

            filterChain.doFilter(request, response);
            return;
        }

        log.info("Token Check Filter........................");
        log.info("JWTUtil: " + jwtUtil);

        try{
            Map<String, Object> payload = validateAccessToken(request);   // 토큰 검사: 토큰 이상 없으면 claim 반환

            String mid = (String)payload.get("mid");

            log.info("mid from JWT payload: " + mid);

            // 토큰의 mid 사용해서 UserDetails 호출
            UserDetails userDetails = apiUserDetailsService.loadUserByUsername(mid);

            // authentication 객체 생성
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

            // SecurityContextHolder 에 현재 사용자정보 전달
            SecurityContextHolder.getContext().setAuthentication(authentication);

            filterChain.doFilter(request, response);
        }catch(AccessTokenException accessTokenException){ // 토큰 예외 처리
            accessTokenException.sendResponseError(response);
        }
    }
    
    // 토큰 검증하고 예외 발생시 AccessTokenException 던지기
    private Map<String, Object> validateAccessToken(HttpServletRequest request) throws AccessTokenException{
        
        // reuqest 헤더에서 Authorization 값 (AccessToken) 추출
        String headerStr = request.getHeader("Authorization");
        
        // Authorization 값이 없다 ->  토큰이 없다 -> UNACCEPT 에러
        if(headerStr == null || headerStr.length() < 8){    // 예외 enum값 중 UNACCEPT만 8글자 이상임
            throw new AccessTokenException(AccessTokenException.TOKEN_ERROR.UNACCEPT);
        }
        
        // 'type + 인증값' 에서 type 문자열 Bearer 생략
        String tokenType = headerStr.substring(0, 6);   // "Bearer" + " " 
        String tokenStr = headerStr.substring(7);   // 토큰 문자열 (인증값)

        // 토큰이 정상적인 구조가 아님
        if(!tokenType.equalsIgnoreCase("Bearer")){
            // 만약 토큰 타입이 Bearer가 아니라면?
            // OAuth2 혹은 JWT가 아니다 
            throw new AccessTokenException(AccessTokenException.TOKEN_ERROR.BADTYPE);
        }

        // 여기서부터는 최소한 JWT토큰은 맞음
        try{
            // 정상 토큰이 맞으므로 claim 반환
            Map<String, Object> values = jwtUtil.validateToken(tokenStr);
            return values;
        }catch(MalformedJwtException malformedJwtException){
            // 토큰 모양이 이상함 : malformed 기형의
            log.error("MalformedJwtException-----------------");
            throw new AccessTokenException(AccessTokenException.TOKEN_ERROR.MALFORM);
        }catch(SignatureException signatureException){
            // 시그니처 이상함
            log.error("SignatureException--------------------");
            throw new AccessTokenException(AccessTokenException.TOKEN_ERROR.BADSIGN);
        }catch(ExpiredJwtException expiredJwtException){
            // 기한 만료됨
            log.error("ExpiredJwtException-------------------");
            throw new AccessTokenException(AccessTokenException.TOKEN_ERROR.EXPIRED);
        }
    }

}
