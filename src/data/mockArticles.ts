export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  isPremium: boolean;
  readTime: number;
  category: string;
  publishedAt: string;
}

export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'The Future of Web Development',
    excerpt: 'Exploring the latest trends and technologies shaping the future of web development.',
    content: `Web development is evolving at an unprecedented pace. From the rise of AI-powered development tools to the emergence of new frameworks and paradigms, developers need to stay ahead of the curve.

The integration of artificial intelligence in development workflows is revolutionizing how we write code. Tools like GitHub Copilot and ChatGPT are becoming indispensable for developers, helping them write more efficient code and solve complex problems faster.

React continues to dominate the frontend landscape, but new players like Svelte and SolidJS are gaining traction. These frameworks offer better performance and developer experience, challenging the status quo.

The backend is also seeing significant changes with the rise of serverless computing and edge functions. Developers can now deploy code closer to their users, resulting in better performance and reduced latency.

As we look to the future, WebAssembly promises to bring near-native performance to web applications, opening up new possibilities for complex applications that were previously only possible as desktop software.`,
    image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
    isPremium: false,
    readTime: 5,
    category: 'Technology',
    publishedAt: '2024-01-15',
  },
  {
    id: '2',
    title: 'Advanced React Patterns',
    excerpt: 'Master advanced React patterns to build scalable and maintainable applications.',
    content: `Advanced React patterns are essential for building large-scale applications. This comprehensive guide covers the most important patterns every React developer should know.

Compound components allow you to create flexible and reusable component APIs. By leveraging React's composition model, you can build components that work together seamlessly while maintaining a clean interface.

The render props pattern provides a way to share code between components using a prop whose value is a function. This pattern is incredibly powerful for creating reusable logic that can be shared across different components.

Higher-order components (HOCs) allow you to reuse component logic by wrapping components with additional functionality. While hooks have largely replaced HOCs, they're still useful in certain scenarios.

Custom hooks are perhaps the most powerful pattern in modern React. They allow you to extract component logic into reusable functions that can be shared across your application.

Error boundaries provide a way to catch JavaScript errors anywhere in your component tree and display a fallback UI instead of crashing the entire application.

Context and providers offer a way to pass data through the component tree without having to pass props down manually at every level.`,
    image: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=800',
    isPremium: true,
    readTime: 8,
    category: 'Development',
    publishedAt: '2024-01-12',
  },
  {
    id: '3',
    title: 'Building Scalable APIs',
    excerpt: 'Learn how to design and build APIs that can handle millions of requests.',
    content: `Building scalable APIs is crucial for modern applications. This guide covers the essential principles and practices for creating APIs that can grow with your business.

Database design is the foundation of any scalable API. Proper indexing, normalization, and query optimization can make the difference between an API that handles thousands of requests per second and one that crashes under load.

Caching strategies are essential for reducing database load and improving response times. From in-memory caches like Redis to CDN-based caching, understanding when and how to cache data is crucial.

Rate limiting protects your API from abuse and ensures fair usage among your users. Implementing proper rate limiting can prevent your service from being overwhelmed by malicious or poorly designed clients.

Load balancing distributes traffic across multiple servers, ensuring that no single server becomes a bottleneck. Understanding different load balancing strategies and when to use them is essential.

Monitoring and observability give you insight into how your API is performing in production. Implementing proper logging, metrics, and alerting helps you identify and resolve issues before they impact users.

API versioning allows you to evolve your API without breaking existing clients. Planning for versioning from the start can save you significant headaches as your API grows.`,
    image: 'https://images.pexels.com/photos/11035540/pexels-photo-11035540.jpeg?auto=compress&cs=tinysrgb&w=800',
    isPremium: true,
    readTime: 12,
    category: 'Backend',
    publishedAt: '2024-01-08',
  },
  {
    id: '4',
    title: 'Introduction to TypeScript',
    excerpt: 'Get started with TypeScript and improve your JavaScript development experience.',
    content: `TypeScript has become an essential tool for JavaScript developers. This introduction will help you understand why TypeScript matters and how to get started.

Type safety is the primary benefit of TypeScript. By adding static type checking to JavaScript, TypeScript helps catch errors at compile time rather than runtime, leading to more reliable code.

The development experience with TypeScript is significantly better than plain JavaScript. Modern editors provide excellent autocomplete, refactoring tools, and inline documentation when using TypeScript.

TypeScript's type system is gradually typed, meaning you can adopt it incrementally in existing JavaScript projects. You don't need to rewrite everything at once to start benefiting from TypeScript.

Interfaces and types allow you to define the shape of your data and functions, making your code more self-documenting and easier to understand for other developers.

Generics provide a way to create reusable components that work with multiple types while maintaining type safety. They're one of the most powerful features of TypeScript's type system.

The TypeScript compiler can target different versions of JavaScript, allowing you to use modern language features while still supporting older browsers.`,
    image: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=800',
    isPremium: false,
    readTime: 6,
    category: 'Programming',
    publishedAt: '2024-01-05',
  },
  {
    id: '5',
    title: 'Modern CSS Techniques',
    excerpt: 'Discover modern CSS features that will transform your web designs.',
    content: `CSS has evolved tremendously in recent years. Modern CSS features provide powerful tools for creating beautiful, responsive designs with less code and better performance.

CSS Grid revolutionized layout design, providing a two-dimensional grid system that makes complex layouts simple and intuitive. Understanding CSS Grid is essential for modern web development.

Flexbox remains crucial for one-dimensional layouts and component-level design. The combination of CSS Grid and Flexbox covers almost all layout scenarios you'll encounter.

CSS Custom Properties (variables) bring dynamic styling capabilities to CSS. They enable theme switching, responsive design, and maintainable stylesheets.

Container queries are a game-changer for responsive design, allowing components to respond to their container's size rather than the viewport size. This enables truly modular, responsive components.

Modern CSS also includes powerful features like aspect-ratio, gap, logical properties, and new color functions that make styling more intuitive and maintainable.

CSS animations and transitions have become more sophisticated, with features like scroll-triggered animations and complex keyframe animations becoming standard practice.`,
    image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
    isPremium: true,
    readTime: 7,
    category: 'Design',
    publishedAt: '2024-01-02',
  },
  {
    id: '6',
    title: 'Getting Started with Node.js',
    excerpt: 'Learn the basics of server-side JavaScript with Node.js.',
    content: `Node.js has transformed JavaScript from a browser-only language into a full-stack development platform. This guide will help you understand the fundamentals of Node.js development.

The event loop is at the heart of Node.js's non-blocking I/O model. Understanding how the event loop works is crucial for writing efficient Node.js applications and avoiding common pitfalls.

NPM (Node Package Manager) is the largest software registry in the world. Learning how to effectively use NPM packages and manage dependencies is essential for Node.js development.

Express.js is the most popular web framework for Node.js. It provides a minimal and flexible foundation for building web applications and APIs.

Asynchronous programming in Node.js is different from browser JavaScript. Understanding callbacks, Promises, and async/await is crucial for writing effective Node.js code.

File system operations, HTTP requests, and database interactions are common tasks in Node.js applications. Each of these has unique considerations in the Node.js environment.

Testing Node.js applications requires different tools and approaches compared to frontend testing. Understanding the testing ecosystem is important for building reliable applications.`,
    image: 'https://images.pexels.com/photos/11035540/pexels-photo-11035540.jpeg?auto=compress&cs=tinysrgb&w=800',
    isPremium: false,
    readTime: 9,
    category: 'Backend',
    publishedAt: '2023-12-28',
  },
];