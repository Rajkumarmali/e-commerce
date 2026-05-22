package server.response;

public class PaymentLineResponse {
    private String payment_link_id;
    private String payment_link_url;

    public PaymentLineResponse() {
    }

    public PaymentLineResponse(String payment_link_id, String payment_link_url) {
        this.payment_link_id = payment_link_id;
        this.payment_link_url = payment_link_url;
    }

    public String getPayment_link_id() {
        return payment_link_id;
    }

    public void setPayment_link_id(String payment_link_id) {
        this.payment_link_id = payment_link_id;
    }

    public String getPayment_link_url() {
        return payment_link_url;
    }

    public void setPayment_link_url(String payment_link_url) {
        this.payment_link_url = payment_link_url;
    }
}
