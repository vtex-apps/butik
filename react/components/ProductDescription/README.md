# Product Description
Product Description is a canonical component that any VTEX app can import.

To import it into your code: 
```js
import ProductDescription from components2
```

## Usage
You can use it in your code like a React component with the jsx tag: `<ProductDescription />`. 
```jsx
<ProductDescription specifications={product.specs}>
   <span>{product.description}</span>
</ProductDescription>
```

| Prop name                | Type       | Description                                                                 |
| ------------------------ | ---------- | --------------------------------------------------------------------------- |
| `children`               | `Node!`    | Children component which contains the product description                   |
| `specifications`         | `Array`    | Specifications that will be displayed on the table                          |
| `specifications[n].name` | `String`   | Specification name                                                          |
| `specifications[n].value`| `String`   | Specifications value                                                        |

See an example at [Product Details](https://github.com/vtex-apps/product-details) app
