package server.service;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import server.exception.ProductException;
import server.model.Category;
import server.model.Product;
import server.repository.CategoryRepository;
import server.repository.ProductRepository;
import server.request.CreateProductRequest;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductServiceImplementation implements ProductService{

    private ProductRepository productRepository;
    private UserService userService;
    private CategoryRepository categoryRepository;

    public ProductServiceImplementation(ProductRepository productRepository,
                                        UserService userService,
                                        CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.userService = userService;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public Product createProduct(CreateProductRequest req) {
        Category topLevel = categoryRepository.findByName(req.getTopLevelCategory());
        if(topLevel == null){
            Category topLevelCategory = new Category();
            topLevelCategory.setName(req.getTopLevelCategory());
            topLevelCategory.setLevel(1);
            topLevel = categoryRepository.save(topLevelCategory);
        }

        Category secondLevel = categoryRepository.findByNameAndParent(req.getSecondLevelCategory(),topLevel.getName());
        if(secondLevel == null){
            Category secondLevelCategory= new Category();
            secondLevelCategory.setName(req.getSecondLevelCategory());
            secondLevelCategory.setParentCategory(topLevel);
            secondLevelCategory.setLevel(2);
            secondLevel = categoryRepository.save(secondLevelCategory);
        }

        Category thirdLevel = categoryRepository.findByNameAndParent(req.getThirdLevelCategory(), topLevel.getName());
        if(thirdLevel == null){
            Category thirdLevelCategory= new Category();
            thirdLevelCategory.setName(req.getThirdLevelCategory());
            thirdLevelCategory.setParentCategory(topLevel);
            thirdLevelCategory.setLevel(3);
            thirdLevel = categoryRepository.save(thirdLevelCategory);
        }

        Product product = new Product();
        product.setTitle(req.getTitle());
        product.setColor(req.getColor());
        product.setDescription(req.getDescription());
        product.setDiscountPresent(req.getDiscountPresent());
        product.setImageUrl(req.getImageUrl());
        product.setBrand(req.getBrand());
        product.setPrice(req.getPrice());
        product.setSizes(req.getSizes());
        product.setQuantity(req.getQuantity());
        product.setCategory(thirdLevel);
        product.setCreatedAt(LocalDateTime.now());

        Product savedProduct = productRepository.save(product);

        return savedProduct;
    }

    @Override
    public String deleterProduct(Long productId) throws ProductException {
        Product product = findProductById(productId);
        product.getSizes().clear();
        productRepository.delete(product);
        return "Product deleted successfully";
    }

    @Override
    public Product updateProduct(Long productId, Product req) throws ProductException {
        Product product = findProductById(productId);

        if(req.getQuantity()!=0){
            product.setQuantity(req.getQuantity());
        }

        return productRepository.save(product) ;
    }

    @Override
    public Product findProductById(Long productId) throws ProductException {
        Optional<Product> opt = productRepository.findById(productId);
        if(opt.isPresent()){
            return opt.get();
        }
       throw new ProductException("Product not fount with this id -"+productId);
    }

    @Override
    public List<Product> findProductByCategory(String category) {
        return List.of();
    }

    @Override
    public Page<Product> getAllProduct(String category, List<String> color, List<String> size,
                                       Integer minPrice, Integer maxPrice, Integer minDiscount,
                                       String sort, String stock, Integer pageNumber, Integer pageSize) {

        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        List<Product> products = productRepository.filterProducts(category,minPrice,maxPrice,minDiscount,sort);

        if(color != null && !color.isEmpty()){
            products = products.stream().filter(p->color.stream().anyMatch(c->
                    c.equalsIgnoreCase(p.getColor()))).collect(Collectors.toList());
        }

        if(stock!=null) {
            if(stock.equals("in_stock")) {
               products=products.stream().filter(p->p.getQuantity()>0).collect(Collectors.toList());
            } else if(stock.equals("out_of_stock")){
                products=products.stream().filter(p->p.getQuantity()<1).collect(Collectors.toList());
            }
        }

        int startInd=(int) pageable.getOffset();
        int endInd =  Math.min(startInd+pageable.getPageSize(),products.size());

        List<Product> pageContent= products.subList(startInd,endInd);
        Page<Product> filterProduct = new PageImpl<>(pageContent,pageable,products.size());
        return filterProduct;
    }
}
