package dev.caustudymatch.chatting.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Chat extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Setter
    @Getter
    @ManyToOne
    @JoinColumn(name = "user_id")
    private AppUser user;

    @Setter
    @Getter
    private String message;

    public Chat(AppUser user, String message) {
        this.user = user;
        this.message = message;
    }
}
