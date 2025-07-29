package in.vansh.BillingSoftware.Service;

import org.springframework.web.multipart.MultipartFile;

public interface FileUploadService {
    String uploadFile(MultipartFile file);

    boolean deleteFile(String imgUrl);
}