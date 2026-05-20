package server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import server.model.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {

}