package in.vansh.BillingSoftware.Service;

import in.vansh.BillingSoftware.IO.CategoryRequest;
import in.vansh.BillingSoftware.IO.CategoryResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CategoryService {
    CategoryResponse add(CategoryRequest request, MultipartFile file);

    List<CategoryResponse> read();

    void delete(String categoryId);
}