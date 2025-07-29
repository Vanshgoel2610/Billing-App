package in.vansh.BillingSoftware.Service;

import in.vansh.BillingSoftware.IO.ItemRequest;
import in.vansh.BillingSoftware.IO.ItemResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ItemService {
    ItemResponse add(ItemRequest request, MultipartFile file);
    List<ItemResponse> fetchItems();
    void deleteItem(String itemId);
}