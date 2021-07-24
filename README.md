# Project: Shopping Cart

## Setup environment 

Github Project: https://github.com/baodien1405/tiki-shopping-cart

### 1. Setup ReactJS App via Create React App

> Link: https://create-react-app.dev/docs/getting-started/


### 2. Add react router 

```
npm i --save react-router-dom
```

### 3. Add UI lib

```
npm i --save @material-ui/core @material-ui/icons @material-ui/lab
```

### 4. Add Form lib

```
npm i --save react-hook-form
```

### 5. Add State management lib

```
npm i --save @reduxjs/toolkit react-redux
```


## Tổ chức folder

```
src
|__ assets
|  |__ api (organize api for app)
|  |__ app (global state managerment) 
|
|__ components (shared components)
|
|__ features
|  |__ Product
|  |  |__ Filters
|  |  |   |__ CategorySkeletonList.jsx
|  |  |   |__ FilterByCategory.jsx
|  |  |   |__ FilterByPrice.jsx
|  |  |   |__ FilterByService.jsx
|  |  |
|  |  |__ components
|  |  |  |__ AddToCartForm
|  |  |  |__ FilterViewer
|  |  |  |__ Product
|  |  |  |__ ProductAdditional
|  |  |  |__ ProductDescription
|  |  |  |__ ProductFilters
|  |  |  |__ ProductInfo
|  |  |  |__ ProductList
|  |  |  |__ ProductMenu
|  |  |  |__ ProductReviews
|  |  |  |__ ProductSkeletonList
|  |  |  |__ ProductSort
|  |  |  |__ ProductThumbnail
|  |  |
|  |  |__ hooks (hook for feature)
|  |  |
|  |  |__ pages
|  |  |  |__ DetailPage
|  |  |  |__ ListPage
|  |  |__ index.jsx
|  |
|  |__ Auth
|  |  |__ components
|  |  |   |__ Login
|  |  |   |__ LoginForm
|  |  |   |__ Register
|  |  |   |__ RegisterForm
|  |  |
|  |  |__ index.jsx
|  |  |__ userSlice.js
|  |     
|  |__ Cart
|     |__ components
|     |   |__ NotProductInCart
|     |   |__ ProductDetailCard
|     |   |__ ProductTotalPrice
|     |   
|     |__ index.jsx
|     |__ cartSlice.js
|     |__ selector.js (compute derived data)
|
|__ utils (define common function using in App)
      |__ common.js
      |__ index.js
```

## Tổ chức routing

- Sử dụng kĩ thuật lazy load components.
- Load theo features.

```js
// App.js
function App() {
  return (
    <div className="app">
      <Header />
      <Switch>
        <Redirect from="/home" to="/" exact />
        <Redirect from="/" to="/products" exact />
        <Route path="/products" component={ProductFeature} />
        <Route path="/cart" component={CartFeature} />
        <Route component={NotFound} />
      </Switch>
    </div>
  )
}
```
## Custom Field 

- Cầu nối giữa UI control và React Hook Form.
- UI control là một controlled component với props: 
  - name: tên xác định control
  - value: giá trị của control
  - onChange: trigger hàm này với giá trị mới khi có thay đổi
  - onBlur: xác định khi nào thì control này bị touched

```js
function InputField(props) {
  const { form, name, label, disabled } = props;
  const { control, formState } = form;
  const { errors } = formState;
  const hasError = errors[name];

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <TextField
          {...field}
          fullWidth
          label={label}
          disabled={disabled}
          error={!!hasError}
          helperText={errors[name]?.message}
          variant="outlined"
          margin="normal"
        />
      )}
    />
  );
}
```
