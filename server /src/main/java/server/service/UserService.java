package server.service;

import server.exception.UserException;
import server.model.User;

public interface UserService {

   public User FindUserById(Long userId) throws UserException;

   public User findUserProfileByJwt(String jwt) throws UserException;

}
