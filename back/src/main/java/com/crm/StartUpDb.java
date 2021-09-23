package com.crm;

import com.crm.model.*;
import com.crm.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Component;

@Component
public class StartUpDb {

    private UserRepository userRepository;

    @Autowired
    public StartUpDb(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @EventListener
    public void appReady(ApplicationReadyEvent event) {
        Boolean init = event.getApplicationContext().getEnvironment().getProperty("initdb", boolean.class);
        if (init == null || init) {
            try {
                User admin1 = new User("Admin", "Istrator", "admin@gmail.com", BCrypt.hashpw("pass", BCrypt.gensalt()), true, UserType.ADMIN);
                User user1 = new User("Test", "User", "testuser@gmail.com", BCrypt.hashpw("pass", BCrypt.gensalt()), true, UserType.USER);

                userRepository.save(admin1);
                userRepository.save(user1);
            } catch (Exception ignored) {
            }
        }
    }

}
