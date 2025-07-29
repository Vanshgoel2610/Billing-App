package in.vansh.BillingSoftware.Service;

import in.vansh.BillingSoftware.IO.UserRequest;
import in.vansh.BillingSoftware.IO.UserResponse;

import java.util.List;

public interface UserService {
    UserResponse createUser(UserRequest request);
    String getUserRole(String email);
    List<UserResponse> readUsers();
    void deleteUser(String id);
}