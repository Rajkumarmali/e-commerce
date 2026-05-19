package server.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import server.exception.ProductException;
import server.model.Product;
import server.service.ProductService;

import java.util.List;

@RestController
@RequestMapping("/api/product")
public class ProductController {

    private ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/products")
    public ResponseEntity<Page<Product>> findProductByCategoryHandler(@RequestParam String category,
            @RequestParam List<String> color, @RequestParam List<String> size,
            @RequestParam Integer minPrice, @RequestParam Integer maxPrice,
            @RequestParam Integer minDiscount, @RequestParam String sort,
            @RequestParam String stock, @RequestParam Integer pageNumber, @RequestParam Integer pageSize){

         Page<Product> res=productService.getAllProduct(category,color,size,minPrice,maxPrice,minDiscount,sort,
                                                        stock,pageNumber, pageSize);
//         return ResponseEntity.status(HttpStatus.ACCEPTED).body(res);
        return new  ResponseEntity<>(res,HttpStatus.ACCEPTED);
    }

    @GetMapping("/product/id/{productId}")
    public ResponseEntity<Product> findProductByIdHandler(@PathVariable Long productId) throws ProductException {
         Product product = productService.findProductById(productId);
         return new ResponseEntity<>(product,HttpStatus.ACCEPTED);
    }



}
