import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {Button, Container, Typography} from "@mui/material";

function ChatroomListByUser(props: { username: string; }) {

    const getChatrooms = async() => {
        const response = await axios.get("http://localhost:8080/chatroom/" + props.username);
        return response.data;
    }

    const { data, error, isSuccess } = useQuery({
        queryKey: ["chatroom"],
        queryFn: getChatrooms
    });

    if(!isSuccess) {
        return(
            <span>
                로딩 중입니다.
            </span>
        )
    } else if(error) {
        return(
            <span>
                오류가 발생했습니다.
            </span>
        )
    } else {
        return(
            <Container>
                <Typography>로딩 완료!</Typography>
                <table>
                    <tbody>
                    {
                        data?.map((room: ChatroomResponse) =>
                            <tr key={room.title}>
                                <td>{room.title}</td>
                            </tr>)
                    }
                    </tbody>
                </table>
            </Container>
        )
    }

}

export default ChatroomListByUser;
export type ChatroomResponse = {
    title: string;
    chats: {
        message: string
    }[];
}
