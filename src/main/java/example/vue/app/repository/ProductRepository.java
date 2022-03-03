package example.vue.app.repository;

import example.vue.app.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@SuppressWarnings("unused")
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {}
