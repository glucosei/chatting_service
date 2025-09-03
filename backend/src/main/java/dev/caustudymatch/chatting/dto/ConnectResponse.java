package dev.caustudymatch.chatting.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import dev.caustudymatch.chatting.domain.AppUser;
import dev.caustudymatch.chatting.domain.Chatroom;
import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ConnectResponse {

    private String user;

    private String message;

    private Chatroom chatroom;
}
