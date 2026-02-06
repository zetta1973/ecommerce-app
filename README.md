# E-commerce App - Arquitectura Hexagonal

## Arquitectura Implementada

Esta aplicacion implementa los principios de **Arquitectura Hexagonal** (Ports & Adapters) con **Vertical Slice** y **Screaming Architecture**.

### Que es la Arquitectura Hexagonal?

La Arquitectura Hexagonal organiza el codigo en capas concentricas donde:
- **Domain** esta en el centro (nucleo de negocio)
- **Application** la rodea (logica de negocio)
- **Infrastructure** y **Presentation** son los puertos externos

Esto permite que el negocio sea independiente de frameworks, UI y bases de datos.

---

## Estructura de Directorios Detallada

```
src/
├── app/                          # Codigo legacy (componentes originales)
│   ├── components/              # Componentes antiguos
│   │   ├── login/              # Login component original
│   │   ├── product-list/       # Product list original
│   │   └── order-list/         # Order list original
│   └── services/               # Servicios originales (eliminados)
│
├── core/                        # CAPA CORE - Infraestructura transversal
│   ├── guards/                 # Guards de proteccion de rutas
│   │   └── auth.guard.ts      # Verifica autenticacion
│   ├── interceptors/          # Interceptores HTTP
│   │   └── jwt.interceptor.ts # Añade token JWT a peticiones
│   └── core.module.ts         # Modulo core de Angular
│
├── features/                    # VERTICAL SLICES - Features independientes
│   │
│   ├── auth/                   # FEATURE: Autenticacion
│   │   ├── application/        # CAPA APPLICATION
│   │   │   └── auth.service.ts # Facade + Servicio HTTP
│   │   ├── presentation/       # CAPA PRESENTATION
│   │   │   ├── login-container/
│   │   │   │   └── login-container.component.ts
│   │   │   └── logout-container/
│   │   │       └── logout-container.component.ts
│   │   ├── auth.module.ts      # Modulo Angular
│   │   └── auth-routing.module.ts # Rutas del feature
│   │
│   ├── products/               # FEATURE: Productos
│   │   ├── application/
│   │   │   └── product.service.ts
│   │   ├── presentation/
│   │   │   └── product-list-container/
│   │   │       └── product-list-container.component.ts
│   │   ├── products.module.ts
│   │   └── products-routing.module.ts
│   │
│   └── orders/                 # FEATURE: Pedidos
│       ├── application/
│       │   └── order.service.ts
│       ├── presentation/
│       │   └── order-list-container/
│       │       └── order-list-container.component.ts
│       ├── orders.module.ts
│       └── orders-routing.module.ts
│
└── shared/                     # CAPA DOMAIN - Modelos compartidos
    └── domain/
        ├── auth/
        │   └── auth.model.ts   # Interfaces y tipos de auth
        ├── products/
        │   └── product.model.ts # Interfaces de productos
        └── orders/
            └── order.model.ts  # Interfaces de pedidos
```

---

## Explicacion de Cada Capa

### 1. DOMAIN LAYER (src/shared/domain/)

**Responsabilidad:** Modelos de negocio puros, sin dependencias externas

**Archivos:**
```typescript
// src/shared/domain/products/product.model.ts
export interface Product {
  id: number;           // Identificador unico
  name: string;         // Nombre del producto
  description: string;  // Descripcion
  price: number;        // Precio
  stock: number;        // Stock disponible
}

export interface ProductFilter {
  name?: string;        // Filtro por nombre
  minPrice?: number;    // Precio minimo
  maxPrice?: number;    // Precio maximo
  inStock?: boolean;    // Solo en stock
}
```

**Principio:** Los modelos de dominio no conocen nada de Angular, HTTP o UI. Son puros TypeScript.

---

### 2. APPLICATION LAYER (src/features/*/application/)

**Responsabilidad:** Logica de negocio, orquestacion de casos de uso

**Archivos:**
```typescript
// src/features/products/application/product.service.ts

// Servicio HTTP (Infrastructure)
@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = 'http://localhost:8080/products';
  
  constructor(private http: HttpClient) {}
  
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
  
  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
  
  createProduct(product: Omit<Product, 'id'>): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }
}

// Facade (Application)
export class ProductFacade {
  constructor(private productService: ProductService) {}
  
  async getProducts(filter?: ProductFilter): Promise<Product[]> {
    // Aqui se puede añadir: cache, transformacion, validacion
    return this.productService.getProducts().toPromise();
  }
  
  async getProduct(id: number): Promise<Product> {
    return this.productService.getProduct(id).toPromise();
  }
  
  async createProduct(product: Omit<Product, 'id'>): Promise<Product> {
    return this.productService.createProduct(product).toPromise();
  }
}
```

**Patron Facade:** Simplifica la interfaz compleja del servicio HTTP para los componentes.

---

### 3. PRESENTATION LAYER (src/features/*/presentation/)

**Responsabilidad:** UI, manejo de eventos de usuario, binding de datos

**Archivos:**
```typescript
// src/features/products/presentation/product-list-container/product-list-container.component.ts

// Container Component (Smart Component)
@Component({
  selector: 'app-product-list-container',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListContainerComponent implements OnInit {
  products: Product[] = [];  // Estado del componente
  
  // Inyeccion de dependencias
  constructor(private productFacade: ProductFacade) {}
  
  // Ciclo de vida
  ngOnInit(): void {
    this.loadProducts();
  }
  
  // Metodos de negocio
  async loadProducts(): Promise<void> {
    try {
      this.products = await this.productFacade.getProducts();
    } catch (error) {
      console.error('Error loading products:', error);
    }
  }
}

// Presentational Component (Dumb Component)
@Component({
  selector: 'app-product-list',
  template: `
    <div class="product-list">
      <h2>Lista de Productos</h2>
      <ul>
        <li *ngFor="let product of products">
          {{ product.name }} - {{ product.price | currency }}
        </li>
      </ul>
    </div>
  `
})
export class ProductListComponent {
  @Input() products: Product[] = [];  // Solo recibe datos
}
```

**Patron Container/Presentational:**
- **Container:** Maneja estado, logica y comunicacion con servicios
- **Presentational:** Solo recibe datos y emite eventos

---

### 4. CORE LAYER (src/core/)

**Responsabilidad:** Infraestructura transversal, autenticacion, interceptores

**Archivos:**
```typescript
// src/core/guards/auth.guard.ts
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private authFacade: AuthFacade,
    private router: Router
  ) {}
  
  canActivate(): boolean | UrlTree {
    if (this.authFacade.isAuthenticated()) {
      return true;
    }
    return this.router.parseUrl('/login');
  }
}

// src/core/interceptors/jwt.interceptor.ts
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('jwt');
    if (token) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }
    return next.handle(request);
  }
}
```

**Funcion:** Proteccion de rutas y manejo transversal del token JWT.

---

## Flujo de Datos en la Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                       │
│  ┌──────────────┐                                           │
│  │   Container  │  <- Maneja estado y logica                 │
│  │  Component   │                                           │
│  └──────┬───────┘                                           │
└─────────┼───────────────────────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────────────────────────────────┐
│                   APPLICATION LAYER                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Facade (ProductFacade)                   │   │
│  │  - Orquesta casos de uso                             │   │
│  │  - Maneja estado de aplicacion                       │   │
│  │  - Transforma datos si es necesario                  │   │
│  └────────────────────┬─────────────────────────────────┘   │
└───────────────────────┼─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│                 INFRASTRUCTURE LAYER                        │
│  ┌──────────────────────────────────────────────────────┐   │
│  │             Service (ProductService)                  │   │
│  │  - Comunicacion HTTP                                 │   │
│  │  - Serializacion/deserializacion                     │   │
│  │  - Manejo de errores de red                          │   │
│  └────────────────────┬─────────────────────────────────┘   │
└───────────────────────┼─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│                     DOMAIN LAYER                            │
│  ┌──────────────────────────────────────────────────────┐   │
│  │             Models (Product, Order)                   │   │
│  │  - Definicion de entidades                           │   │
│  │  - Tipos y interfaces                                │   │
│  │  - Reglas de negocio basicas                         │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## Ventajas de Esta Arquitectura

### 1. Separacion de Responsabilidades

**ANTES (Arquitectura tradicional):**
  Componente -> HTTP Directo -> API
  (Acoplado, dificil de testear)

**AHORA (Arquitectura Hexagonal):**
  Container -> Facade -> Service -> API
  (Desacoplado, cada capa tiene su responsabilidad)

### 2. Testabilidad

```typescript
// Facilidad para mockear dependencias
class MockProductService {
  getProducts() {
    return of([{ id: 1, name: 'Test' }]);
  }
}

// Test del Container
const facade = new ProductFacade(mockService);
const component = new ProductListContainerComponent(facade);
```

### 3. Mantenibilidad
- Cambiar de REST a GraphQL: Solo modificar ProductService
- Cambiar UI framework: Solo modificar ProductListComponent
- Agregar logica de negocio: Solo modificar ProductFacade

### 4. Screaming Architecture
La estructura de carpetas comunica que hace la aplicacion:
```
features/
├── auth/          <- Autenticacion
├── products/      <- Productos  
└── orders/        <- Pedidos
```

---

## Como Levantar el Proyecto

### Prerrequisitos
```bash
# Node.js 18+
node --version

# Angular CLI
npm install -g @angular/cli

# Dependencias
npm install
```

### Desarrollo Local
```bash
# 1. Iniciar backend Spring Boot
cd ../backend
./mvnw spring-boot:run

# 2. En otra terminal, iniciar frontend Angular
cd frontend
ng serve --proxy-config proxy.conf.json

# 3. Acceder a
http://localhost:4200
```

### Con Docker
```bash
# Levantar todo el stack
docker-compose up --build

# Acceder a la aplicacion
http://localhost:4200

# Acceder a la API
http://localhost:8080
```

---

## Endpoints de API para Pruebas

### Autenticacion
```bash
# Login
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# Response:
# {"token":"eyJhbGciOiJIUzI1NiIs...","user":{"id":1,"email":"user@example.com"}}
```

### Productos
```bash
# Obtener todos los productos
curl http://localhost:8080/products

# Obtener producto por ID
curl http://localhost:8080/products/1

# Crear producto
curl -X POST http://localhost:8080/products \
  -H "Content-Type: application/json" \
  -d '{"name":"MacBook Pro","description":"Laptop Apple","price":1999.99,"stock":10}'

# Actualizar producto
curl -X PUT http://localhost:8080/products/1 \
  -H "Content-Type: application/json" \
  -d '{"price":1299.99}'

# Eliminar producto
curl -X DELETE http://localhost:8080/products/1
```

### Pedidos
```bash
# Obtener todos los pedidos
curl http://localhost:8080/orders

# Crear pedido
curl -X POST http://localhost:8080/orders \
  -H "Content-Type: application/json" \
  -d '{"products":[{"productId":1,"quantity":2}]}'

# Actualizar estado del pedido
curl -X PATCH http://localhost:8080/orders/1/status \
  -H "Content-Type: application/json" \
  -d '{"status":"confirmed"}'
```

---

## Patrones Utilizados

### 1. Facade Pattern
Simplifica la interfaz compleja del servicio HTTP para los componentes.

### 2. Repository Pattern
Abstrae el acceso a datos (en este caso, HTTP).

### 3. Dependency Injection
Angular inyecta dependencias automaticamente.

### 4. Container/Presentational Components
Separacion de responsabilidades en la capa de presentacion.

### 5. Vertical Slice
Cada feature es autonomo y contiene todas sus capas.

---

## Guia de Desarrollo

### Para agregar un nuevo Feature:

1. **Crear estructura:**
```bash
mkdir -p src/features/new-feature/{application,presentation}
```

2. **Definir modelo de dominio:**
```typescript
// src/shared/domain/new-feature/new-feature.model.ts
export interface NewFeature {
  id: number;
  name: string;
}
```

3. **Crear servicio (Infrastructure):**
```typescript
// src/features/new-feature/application/new-feature.service.ts
@Injectable()
export class NewFeatureService {
  // Llamadas HTTP
}

export class NewFeatureFacade {
  // Logica de negocio
}
```

4. **Crear componentes (Presentation):**
```typescript
// src/features/new-feature/presentation/new-feature-container/
@Component({...})
export class NewFeatureContainerComponent {}
```

5. **Configurar rutas:**
```typescript
// src/features/new-feature/new-feature-routing.module.ts
const routes: Routes = [
  { path: 'new-feature', component: NewFeatureContainerComponent }
];
```

---

## Debugging y Troubleshooting

### Verificar estructura:
```bash
# Listar todos los directorios
find src -type d | sort

# Verificar archivos en un feature
ls -la src/features/products/application/
```

### Errores comunes:

**Error: "Cannot find module"**
- Verificar que el path del import sea correcto
- Verificar que el archivo exista

**Error: "No provider for ProductFacade"**
- Agregar ProductFacade a los providers del modulo

**Error: "NullInjectorError"**
- Verificar que HttpClientModule este importado en AppModule

---

## Soporte y Recursos

- **Documentacion Angular:** https://angular.io/docs
- **Arquitectura Hexagonal:** https://alistair.cockburn.us/hexagonal-architecture/
- **Vertical Slice Architecture:** https://jimmybogard.com/vertical-slice-architecture/

---

**Version:** 1.0.0  
**Autor:** [Tu Nombre]  
**Fecha:** 2024