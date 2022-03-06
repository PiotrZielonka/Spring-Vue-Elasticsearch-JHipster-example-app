package example.vue.app.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ProductSearchRepositoryMockConfiguration {

    @MockBean
    private ProductSearchRepository mockProductSearchRepository;
}
