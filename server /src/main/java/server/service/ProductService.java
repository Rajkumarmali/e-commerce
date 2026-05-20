package server.service;

import org.springframework.data.domain.Page;
import server.exception.ProductException;
import server.model.Product;
import server.request.CreateProductRequest;

import java.util.List;

public interface ProductService {
    public Product createProduct(CreateProductRequest req);
    public String deleterProduct(Long productId) throws ProductException;
    public Product updateProduct(Long productId,Product req) throws ProductException;
    public Product findProductById(Long productId) throws ProductException;
    public List<Product> findProductByCategory(String category);
    public Page<Product> getAllProduct(String category,List<String> color,List<String> size,
                                       Integer minPrice,Integer maxPrice,Integer minDiscount, String sort,String stock,
                                       Integer pageNumber,Integer pageSize);

}
