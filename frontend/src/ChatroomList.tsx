import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {Container, Typography} from "@mui/material";

function ChatroomList() {

    const getChatrooms = async(): Promise<ChatroomResponse[]> => {
        const response = await axios.get("http://localhost:8080/api/chatrooms");

        return response.data._embedded.chatrooms;
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
                                <tr key={room._links.self.href}>
                                    <td>{room.id}</td>
                                    <td>{room.title}</td>
                                </tr>)
                    }
                    </tbody>
                </table>
            </Container>
        )
    }

}

export default ChatroomList;
export type ChatroomResponse = {
    id: bigint;
    title: string;
    _links: {
        self: {
            href: string;
        }, chatroom: {
            href: string
        }
    }
}