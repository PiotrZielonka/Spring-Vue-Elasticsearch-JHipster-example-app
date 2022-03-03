package example.vue.app.service.mapper;

import example.vue.app.domain.Product;
import example.vue.app.service.dto.ProductDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {})
public interface ProductMapper extends EntityMapper<ProductDTO, Product> {}
