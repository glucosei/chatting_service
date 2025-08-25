package dev.caustudymatch.chatting;

import dev.caustudymatch.chatting.domain.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import java.util.Arrays;

@SpringBootApplication
@EnableJpaAuditing
public class Application implements CommandLineRunner {
    private static final Logger logger = LoggerFactory.getLogger(
            Application.class
    );

    private final CarRepository repository;
    private final OwnerRepository orepository;
    private final AppUserRepository appUserRepository;

    public Application(CarRepository repository, OwnerRepository orepository, AppUserRepository appUserRepository) {
        this.repository = repository;
        this.orepository = orepository;
        this.appUserRepository = appUserRepository;
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        // for debug
        Owner owner1 = new Owner("John", "Johnson");
        Owner owner2 = new Owner("Mary", "Robinson");
        orepository.saveAll(Arrays.asList(owner1, owner2));

        repository.save(new Car("Ford", "Mustang", "Red", "ADF-1121", 2023, 59000, owner1));
        repository.save(new Car("Nissan", "Leaf", "White", "SSJ-3002", 2020, 29000, owner2));
        repository.save(new Car("Toyota", "Prius", "Silver", "KKO-0212", 2022, 39000, owner2));

        appUserRepository.save(new AppUser("user", "$2a$10$eof1KMpo.Zag39ikFyVW7OXxXRhBLCCnWvg2INHQap2hZENmJZzaO", "USER"));
        appUserRepository.save(new AppUser("admin", "$2a$10$fCcz7iZRPSlB6X1AoCswCOeWxUsXugwV9GHsGIJjzSc7Oao4JxVdu", "ADMIN"));
    }
}

