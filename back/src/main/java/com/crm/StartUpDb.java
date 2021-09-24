package com.crm;

import com.crm.model.*;
import com.crm.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Component;

import java.util.Collections;

@Component
public class StartUpDb {

    private UserRepository userRepository;
    private ClientRepository clientRepository;
    private ClientContactRepository clientContactRepository;
    private DevelopmentRepository developmentRepository;
    private FirstMeetingRepository firstMeetingRepository;
    private OrderRepository orderRepository;
    private POCDevelopmentRepository pocDevelopmentRepository;
    private POCInstallationRepository pocInstallationRepository;
    private OpportunityRepository opportunityRepository;

    @Autowired
    public StartUpDb(UserRepository userRepository, ClientRepository clientRepository, ClientContactRepository clientContactRepository, DevelopmentRepository developmentRepository, FirstMeetingRepository firstMeetingRepository, OrderRepository orderRepository, POCDevelopmentRepository pocDevelopmentRepository, POCInstallationRepository pocInstallationRepository, OpportunityRepository opportunityRepository) {
        this.userRepository = userRepository;
        this.clientRepository = clientRepository;
        this.clientContactRepository = clientContactRepository;
        this.developmentRepository = developmentRepository;
        this.firstMeetingRepository = firstMeetingRepository;
        this.orderRepository = orderRepository;
        this.pocDevelopmentRepository = pocDevelopmentRepository;
        this.pocInstallationRepository = pocInstallationRepository;
        this.opportunityRepository = opportunityRepository;
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

                // Opportunity1
                ClientContact clientContact1 = new ClientContact("John", "Dope", "johndope@crm.com", "23432152", "linkedin.com/crmjohn");
                Client client1 = new Client("Client1", "client1.com", "Technology", "Tech", "South America", "", Collections.singletonList(clientContact1), user1);
                Opportunity opportunity1 = new Opportunity(user1, client1, Stage.PROSPECT);
                clientContactRepository.save(clientContact1);
                clientRepository.save(client1);
                firstMeetingRepository.save(opportunity1.getFirstMeeting());
                developmentRepository.save(opportunity1.getDevelopment());
                pocDevelopmentRepository.save(opportunity1.getPocDevelopment());
                pocInstallationRepository.save(opportunity1.getPocInstallation());
                orderRepository.save(opportunity1.getOrder());
                opportunityRepository.save(opportunity1);

            } catch (Exception ignored) {
            }
        }
    }

}
