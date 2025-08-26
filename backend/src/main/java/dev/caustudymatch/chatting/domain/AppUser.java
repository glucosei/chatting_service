package dev.caustudymatch.chatting.domain;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
public class AppUser {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable=false, updatable=false)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role;

    public Set<Chatroom> getChatrooms() {
        return chatrooms;
    }

    public void joinChatroom(Chatroom chatroom) {
        this.chatrooms.add(chatroom);
        chatroom.getParticipants().add(this); // 양방향 동기화
    }

    public void setChatrooms(Set<Chatroom> chatrooms) {
        this.chatrooms = chatrooms;
    }

    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(name="chatroom_participants",joinColumns =
            {
                    @JoinColumn(name="participantid")
            }, inverseJoinColumns = {
            @JoinColumn(name = "id")
    })
    private Set<Chatroom> chatrooms = new HashSet<>();

    public AppUser() {}

    public AppUser(String username, String password, String role)
    {
        super();
        this.username = username;
        this.password = password;
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
