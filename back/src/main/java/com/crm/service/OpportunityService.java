package com.crm.service;

import com.crm.model.*;
import com.crm.model.form.ClientForm;
import com.crm.model.form.StageForm;
import com.crm.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class OpportunityService {

    private ClientRepository clientRepository;
    private ClientContactRepository clientContactRepository;
    private DevelopmentRepository developmentRepository;
    private FirstMeetingRepository firstMeetingRepository;
    private OrderRepository orderRepository;
    private POCDevelopmentRepository pocDevelopmentRepository;
    private POCInstallationRepository pocInstallationRepository;
    private UserRepository userRepository;
    private OpportunityRepository opportunityRepository;
    private UserService userService;

    @Autowired
    public OpportunityService(ClientRepository clientRepository, ClientContactRepository clientContactRepository, DevelopmentRepository developmentRepository, FirstMeetingRepository firstMeetingRepository, OrderRepository orderRepository, POCDevelopmentRepository pocDevelopmentRepository, POCInstallationRepository pocInstallationRepository, UserRepository userRepository, OpportunityRepository opportunityRepository, UserService userService) {
        this.clientRepository = clientRepository;
        this.clientContactRepository = clientContactRepository;
        this.developmentRepository = developmentRepository;
        this.firstMeetingRepository = firstMeetingRepository;
        this.orderRepository = orderRepository;
        this.pocDevelopmentRepository = pocDevelopmentRepository;
        this.pocInstallationRepository = pocInstallationRepository;
        this.userRepository = userRepository;
        this.opportunityRepository = opportunityRepository;
        this.userService = userService;
    }

    public List<Opportunity> findAll() {
        return opportunityRepository.findAll();
    }

    public int saveOpportunity(ClientForm clientForm) {
        User owner = userService.findCurrent().orElseThrow(() -> new NoSuchElementException("User does not exist."));

        Client client = new Client();
        clientForm.patch(client);
        client.setOwner(owner);
        clientRepository.save(client);

        Opportunity opportunity = new Opportunity();
        opportunity.setClient(client);
        opportunity.setCurrentOwner(owner);
        opportunity.setStage(Stage.PROSPECT);
        opportunityRepository.save(opportunity);
        return opportunity.getId();
    }

    public Optional<Opportunity> findById(int opportunityId) {
        return opportunityRepository.findById(opportunityId);
    }

    public Stage advanceStage(int opportunityId, StageForm stageForm) {
        Opportunity opportunity = findById(opportunityId).orElseThrow(() -> new NoSuchElementException("Opportunity does not exist."));
        User newOwner = userService.findById(stageForm.getNewOwner()).orElseThrow(() -> new NoSuchElementException("New Owner does not exist."));
        if (opportunity.getStage() == Stage.ORDER) return Stage.ORDER;
        Stage next = Stage.next(opportunity.getStage());
        opportunity.setStage(next);
        opportunity.setCurrentOwner(newOwner);
        opportunityRepository.save(opportunity);
        return next;
    }

    public void updateClient(int opportunityId, ClientForm clientForm) {
        Opportunity opportunity = findById(opportunityId).orElseThrow(() -> new NoSuchElementException("Opportunity does not exist."));
        Client client = opportunity.getClient();
        clientForm.patch(client);
        clientRepository.save(client);
    }

    // TODO one to many working?
    public void addClientContact(int opportunityId, ClientContact clientContact) {
        Opportunity opportunity = findById(opportunityId).orElseThrow(() -> new NoSuchElementException("Opportunity does not exist."));
        Client client = opportunity.getClient();
        client.getClientContacts().add(clientContact);
        clientContactRepository.save(clientContact);
        clientRepository.save(client);
    }
}
