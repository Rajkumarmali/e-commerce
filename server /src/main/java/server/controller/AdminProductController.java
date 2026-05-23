package server.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import server.exception.ProductException;
import server.model.Product;
import server.request.CreateProductRequest;
import server.response.ApiResponse;
import server.service.ProductService;

@RestController
@RequestMapping("/api/admin/products")
public class AdminProductController {

    private ProductService productService;

    public AdminProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/")
    public ResponseEntity<Product> createProduct(@RequestBody CreateProductRequest req){
        Product product =productService.createProduct(req);
        return new ResponseEntity<>(product,HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{productId}")
    public ResponseEntity<ApiResponse> deleteProduct(@PathVariable Long productId) throws ProductException {
        productService.deleterProduct(productId);
        ApiResponse res = new ApiResponse();
        res.setStatus(true);
        res.setMessage("Product delete successfully");
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @PutMapping("/update/{productId}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long productId,@RequestBody Product product) throws ProductException {
        Product createProduct = productService.updateProduct(productId,product);
        return new ResponseEntity<>(createProduct,HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<ApiResponse> createMultipleProduct(@RequestBody CreateProductRequest[] req){
        for(CreateProductRequest product:req){
            productService.createProduct(product);
        }
        ApiResponse res = new ApiResponse();
        res.setMessage("Create multiple products ");
        res.setStatus(true);
        return new ResponseEntity<>(res,HttpStatus.CREATED);
    }

}
