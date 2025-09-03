package dev.caustudymatch.chatting.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Entity
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Chatroom extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String title;


    @ManyToMany(mappedBy = "chatRooms")
    @JsonIgnore
    private Set<AppUser> participants = new HashSet<>();


    @OneToMany(mappedBy = "chatroom")
    @JsonIgnore
    private List<Chat> chats = new ArrayList<>();

}
