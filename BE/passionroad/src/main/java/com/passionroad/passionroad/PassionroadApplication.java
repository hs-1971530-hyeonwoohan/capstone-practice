package com.passionroad.passionroad;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing	// allow jpa auditing from BaseEntity
public class PassionroadApplication {

	public static void main(String[] args) {
		SpringApplication.run(PassionroadApplication.class, args);
	}

}
