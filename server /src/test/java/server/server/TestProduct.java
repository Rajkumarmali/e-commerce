//package server.server;
//
//import org.junit.jupiter.api.Assertions;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import server.exception.ProductionException;
//import server.model.Product;
//import server.repository.ProductRepository;
//import server.request.CreateProductRequest;
//import server.service.ProductServiceImplementation;
//
//import java.util.Arrays;
//import java.util.Collections;
//import java.util.List;
//
//
//import org.springframework.data.domain.Page;
//
//
//
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.Mockito.*;
//
//@SpringBootTest
//public class TestProduct {
//
//    @Autowired
//    private ProductServiceImplementation productServiceImplementation;
//
//    @Autowired
//    private ProductRepository productRepository;
//
//    @Test
//    public void testCreateProduct(){
//        CreateProductRequest request = new CreateProductRequest();
//
//        request.setTitle("iPhone 15");
//        request.setDescription("Apple Mobile");
//        request.setPrice(100000);
//        request.setDiscountPresent(10);
//        request.setQuantity(5);
//        request.setBrand("Apple");
//        request.setColor("Black");
//        request.setImageUrl("iphone.png");
//
//        request.setTopLevelCategory("Electronics");
//        request.setSecondLevelCategory("Mobile");
//        request.setThirdLevelCategory("SmartPhone");
//
//        Product product =
//                productServiceImplementation.createProduct(request);
//        System.out.println(product);
//
//        Assertions.assertNotNull(product);
//
//        Assertions.assertEquals(
//                "iPhone 15",
//                product.getTitle());
//
//        Assertions.assertEquals(
//                "Apple",
//                product.getBrand());
//
//        Assertions.assertEquals(
//                100000,
//                product.getPrice());
//    }
//
//    @Test
//    public void testUpdateProduct() throws ProductionException {
//        Long productId = 1L;
//        Product req = new Product();
//        req.setQuantity(10);
//        productServiceImplementation.updateProduct(productId,req);
//    }
//
//    @Test
//    public void findProductById() throws ProductionException{
//        Product product = productServiceImplementation.findProductById(1L);
//        System.out.println(product);
//    }
//
//    @Test
//    void findAllProduct() {
//        Page<Product> result =
//                productServiceImplementation.getAllProduct(
//                        null,                   // category
//                        Arrays.asList("Black"), // color
//                        Collections.emptyList(), // size
//                        null,                   // minPrice
//                        null,                   // maxPrice
//                        null,                   // minDiscount
//                        null,                   // sort
//                        null,                   // stock
//                        0,                      // pageNumber
//                        10                      // pageSize
//                );
//
//        System.out.println(result);
//    }
//
//}
