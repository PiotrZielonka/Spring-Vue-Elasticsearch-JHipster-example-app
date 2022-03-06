package example.vue.app.service;

import example.vue.app.service.dto.ProductDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductService {
    ProductDTO save(ProductDTO productDto);

    Optional<ProductDTO> partialUpdate(ProductDTO productDto);

    Page<ProductDTO> findAll(Pageable pageable);

    Optional<ProductDTO> findOne(Long id);

    void delete(Long id);

    Page<ProductDTO> search(String query, Pageable pageable);
}
