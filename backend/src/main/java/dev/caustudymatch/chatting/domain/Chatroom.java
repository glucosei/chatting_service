package dev.caustudymatch.chatting.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;
import java.util.Set;

@Entity
public class Chatroom {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String title;

    @ManyToMany(mappedBy = "chatrooms")
    @JsonIgnore
    private Set<AppUser> participants;

    public Chatroom(String title, Set<AppUser> participants) {
        this.title = title;
        this.participants = participants;
    }

    public Chatroom() {

    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Set<AppUser> getParticipants() {
        return participants;
    }

    public void setParticipants(Set<AppUser> participants) {
        this.participants = participants;
    }
}
