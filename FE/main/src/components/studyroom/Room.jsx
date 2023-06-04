import React from 'react'
import { FaUserAlt } from "react-icons/fa";
import AnimatedIcon from "../../imgs/AnimatedIcons";

const Room = React.forwardRef(({ room }, ref) => {

    const roomBody = (
        <>
                     
        </>
    )

    const content = ref
        ? <article ref={ref}>{roomBody}</article>
        : <article>{roomBody}</article>

    return content
})

export default Room