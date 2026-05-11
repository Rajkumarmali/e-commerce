package server.model;

import jakarta.persistence.Column;

import java.time.LocalDate;

public class PaymentInformation {
    @Column(name = "cardholder_name")
    private String cardHolderName;

    @Column(name = "card_name")
    private String cardName;

    @Column(name = "expiration_date")
    private LocalDate expirationDate;

    private String cvv;

}
