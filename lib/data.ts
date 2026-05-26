export interface Task {
  id: string
  text: string
  tag: string
  tagBg: string
  tagColor: string
}

export interface Section {
  title: string
  tasks: Task[]
}

export interface Week {
  id: number
  badge: string
  title: string
  days: string
  badgeBg: string
  badgeColor: string
  sections: Section[]
}

export const weeks: Week[] = [
  {
    id: 0, badge: 'Week 0', title: 'JavaScript — sabka base', days: 'Day 1–3',
    badgeBg: '#FAEEDA', badgeColor: '#633806',
    sections: [
      { title: 'Day 1 — Core JS', tasks: [
        { id: 'w0-t1', text: 'Closures — function + lexical scope', tag: 'JS', tagBg: '#FAEEDA', tagColor: '#633806' },
        { id: 'w0-t2', text: 'Hoisting — var, let, const difference', tag: 'JS', tagBg: '#FAEEDA', tagColor: '#633806' },
        { id: 'w0-t3', text: 'Prototype + Prototype Chain — OOP in JS', tag: 'JS', tagBg: '#FAEEDA', tagColor: '#633806' },
        { id: 'w0-t4', text: 'this keyword — context binding', tag: 'JS', tagBg: '#FAEEDA', tagColor: '#633806' },
        { id: 'w0-t5', text: 'call, apply, bind — difference + usage', tag: 'JS', tagBg: '#FAEEDA', tagColor: '#633806' },
      ]},
      { title: 'Day 2 — Async JS', tasks: [
        { id: 'w0-t6', text: 'Event Loop — call stack, callback queue, microtask queue', tag: 'JS', tagBg: '#FAEEDA', tagColor: '#633806' },
        { id: 'w0-t7', text: 'Promises — .then, .catch, Promise.all, Promise.race', tag: 'JS', tagBg: '#FAEEDA', tagColor: '#633806' },
        { id: 'w0-t8', text: 'Async/Await — error handling with try/catch', tag: 'JS', tagBg: '#FAEEDA', tagColor: '#633806' },
        { id: 'w0-t9', text: 'Generators + Iterators — yield keyword', tag: 'JS', tagBg: '#FAEEDA', tagColor: '#633806' },
      ]},
      { title: 'Day 3 — Advanced JS', tasks: [
        { id: 'w0-t10', text: 'Map, Filter, Reduce — deep dive', tag: 'JS', tagBg: '#FAEEDA', tagColor: '#633806' },
        { id: 'w0-t11', text: 'Debounce + Throttle — performance', tag: 'JS', tagBg: '#FAEEDA', tagColor: '#633806' },
        { id: 'w0-t12', text: 'Currying + Memoization — functional programming', tag: 'JS', tagBg: '#FAEEDA', tagColor: '#633806' },
        { id: 'w0-t13', text: 'Destructuring + Spread + Rest — ES6', tag: 'JS', tagBg: '#FAEEDA', tagColor: '#633806' },
        { id: 'w0-t14', text: 'Optional Chaining ?. + Nullish Coalescing ??', tag: 'JS', tagBg: '#FAEEDA', tagColor: '#633806' },
        { id: 'w0-t15', text: 'WeakMap + WeakSet + Symbol + Proxy', tag: 'JS', tagBg: '#FAEEDA', tagColor: '#633806' },
      ]},
      { title: 'DSA — Week 0', tasks: [
        { id: 'w0-dsa', text: 'Two Sum, Contains Duplicate, Best Time to Buy Stock, Valid Anagram, Reverse String, Palindrome (6 questions)', tag: 'DSA', tagBg: '#EAF3DE', tagColor: '#27500A' },
      ]},
    ],
  },
  {
    id: 1, badge: 'Week 1', title: 'React.js + MongoDB', days: 'Day 4–10',
    badgeBg: '#E6F1FB', badgeColor: '#0C447C',
    sections: [
      { title: 'React.js', tasks: [
        { id: 'w1-t1', text: 'useState, useEffect, useRef, useMemo, useCallback — deep revise', tag: 'React', tagBg: '#E6F1FB', tagColor: '#0C447C' },
        { id: 'w1-t2', text: 'Custom Hooks — reusable logic banana', tag: 'React', tagBg: '#E6F1FB', tagColor: '#0C447C' },
        { id: 'w1-t3', text: 'Redux Toolkit + Context API — state management', tag: 'React', tagBg: '#E6F1FB', tagColor: '#0C447C' },
        { id: 'w1-t4', text: 'React performance — lazy loading, memo, code splitting', tag: 'React', tagBg: '#E6F1FB', tagColor: '#0C447C' },
        { id: 'w1-t5', text: 'React + TypeScript — typed components, props, generics', tag: 'TS', tagBg: '#EEEDFE', tagColor: '#3C3489' },
        { id: 'w1-t6', text: 'React Router v6 — nested routes, protected routes', tag: 'React', tagBg: '#E6F1FB', tagColor: '#0C447C' },
      ]},
      { title: 'MongoDB', tasks: [
        { id: 'w1-t7', text: 'Aggregation Pipeline — group, match, lookup, project', tag: 'MongoDB', tagBg: '#E1F5EE', tagColor: '#085041' },
        { id: 'w1-t8', text: 'Indexing — single, compound, text indexes', tag: 'MongoDB', tagBg: '#E1F5EE', tagColor: '#085041' },
        { id: 'w1-t9', text: 'Mongoose — virtuals, middleware, populate, schema types', tag: 'MongoDB', tagBg: '#E1F5EE', tagColor: '#085041' },
        { id: 'w1-t10', text: 'MongoDB Atlas — cloud setup, monitoring, backup', tag: 'MongoDB', tagBg: '#E1F5EE', tagColor: '#085041' },
      ]},
      { title: 'DSA — Week 1', tasks: [
        { id: 'w1-dsa', text: 'Max Subarray, Product Except Self, Group Anagrams, Longest Substring, Container Water, 3Sum, Move Zeroes, Merge Arrays (8 questions)', tag: 'DSA', tagBg: '#EAF3DE', tagColor: '#27500A' },
      ]},
    ],
  },
  {
    id: 2, badge: 'Week 2', title: 'Node.js + Express + Auth + Socket.io', days: 'Day 11–17',
    badgeBg: '#EEEDFE', badgeColor: '#3C3489',
    sections: [
      { title: 'Node.js Core', tasks: [
        { id: 'w2-t1', text: 'Event Loop — call stack, callback queue, microtask queue', tag: 'Node', tagBg: '#FAEEDA', tagColor: '#633806' },
        { id: 'w2-t2', text: 'Callback vs Promise vs Async/Await', tag: 'Node', tagBg: '#FAEEDA', tagColor: '#633806' },
        { id: 'w2-t3', text: 'Streams + Buffer — readable, writable, transform', tag: 'Node', tagBg: '#FAEEDA', tagColor: '#633806' },
        { id: 'w2-t4', text: 'EventEmitter — custom events banana', tag: 'Node', tagBg: '#FAEEDA', tagColor: '#633806' },
        { id: 'w2-t5', text: 'Cluster module + Worker Threads — multi-core usage', tag: 'Node', tagBg: '#FAEEDA', tagColor: '#633806' },
      ]},
      { title: 'Express.js', tasks: [
        { id: 'w2-t6', text: 'Middleware chain — next() function, order matters', tag: 'Express', tagBg: '#FAEEDA', tagColor: '#633806' },
        { id: 'w2-t7', text: 'Error handling middleware — 4 argument pattern', tag: 'Express', tagBg: '#FAEEDA', tagColor: '#633806' },
        { id: 'w2-t8', text: 'Rate Limiting + Helmet + CORS + Morgan — security', tag: 'Express', tagBg: '#FAEEDA', tagColor: '#633806' },
        { id: 'w2-t9', text: 'Multer — file upload handling', tag: 'Express', tagBg: '#FAEEDA', tagColor: '#633806' },
      ]},
      { title: 'Authentication', tasks: [
        { id: 'w2-t10', text: 'JWT — access token + refresh token complete flow', tag: 'Auth', tagBg: '#FCEBEB', tagColor: '#791F1F' },
        { id: 'w2-t11', text: 'Bcrypt — password hashing + comparison', tag: 'Auth', tagBg: '#FCEBEB', tagColor: '#791F1F' },
        { id: 'w2-t12', text: 'Role Based Access Control — admin, user, moderator', tag: 'Auth', tagBg: '#FCEBEB', tagColor: '#791F1F' },
        { id: 'w2-t13', text: 'Redis Caching — fast data retrieval + session store', tag: 'Auth', tagBg: '#FCEBEB', tagColor: '#791F1F' },
      ]},
      { title: 'Socket.io', tasks: [
        { id: 'w2-t14', text: 'Emit + On — events revise', tag: 'Socket', tagBg: '#E6F1FB', tagColor: '#0C447C' },
        { id: 'w2-t15', text: 'Rooms + Namespaces — difference revise', tag: 'Socket', tagBg: '#E6F1FB', tagColor: '#0C447C' },
        { id: 'w2-t16', text: 'Socket + JWT Auth — secure connection', tag: 'Socket', tagBg: '#E6F1FB', tagColor: '#0C447C' },
        { id: 'w2-t17', text: 'Socket.io + Redis — multiple servers scaling', tag: 'Socket', tagBg: '#E6F1FB', tagColor: '#0C447C' },
      ]},
      { title: 'DSA — Week 2', tasks: [
        { id: 'w2-dsa', text: 'Valid Parentheses, Min Stack, Next Greater Element, Queue Using Stacks, Reverse LL, Detect Cycle, Merge Lists, Find Middle (8 questions)', tag: 'DSA', tagBg: '#EAF3DE', tagColor: '#27500A' },
      ]},
    ],
  },
  {
    id: 3, badge: 'Week 3', title: 'Next.js + TypeScript + GraphQL + AWS + Docker', days: 'Day 18–24',
    badgeBg: '#E1F5EE', badgeColor: '#085041',
    sections: [
      { title: 'Next.js', tasks: [
        { id: 'w3-t1', text: 'App Router — layouts, loading, error, not-found files', tag: 'Next.js', tagBg: '#EEEDFE', tagColor: '#3C3489' },
        { id: 'w3-t2', text: 'Server Components vs Client Components', tag: 'Next.js', tagBg: '#EEEDFE', tagColor: '#3C3489' },
        { id: 'w3-t3', text: 'Server Actions — form handling without API', tag: 'Next.js', tagBg: '#EEEDFE', tagColor: '#3C3489' },
        { id: 'w3-t4', text: 'SSR vs SSG vs ISR — kab kya use karein', tag: 'Next.js', tagBg: '#EEEDFE', tagColor: '#3C3489' },
      ]},
      { title: 'TypeScript', tasks: [
        { id: 'w3-t5', text: 'Types vs Interfaces — difference + when to use', tag: 'TS', tagBg: '#EEEDFE', tagColor: '#3C3489' },
        { id: 'w3-t6', text: 'Generics — reusable type-safe functions', tag: 'TS', tagBg: '#EEEDFE', tagColor: '#3C3489' },
        { id: 'w3-t7', text: 'Utility Types — Partial, Pick, Omit, Required', tag: 'TS', tagBg: '#EEEDFE', tagColor: '#3C3489' },
      ]},
      { title: 'GraphQL Revision', tasks: [
        { id: 'w3-t8', text: 'Queries + Mutations + Subscriptions — deep revise', tag: 'GraphQL', tagBg: '#FAECE7', tagColor: '#993C1D' },
        { id: 'w3-t9', text: 'Apollo Client — useQuery, useMutation, useSubscription', tag: 'GraphQL', tagBg: '#FAECE7', tagColor: '#993C1D' },
        { id: 'w3-t10', text: 'Apollo Server — resolvers, schema, context', tag: 'GraphQL', tagBg: '#FAECE7', tagColor: '#993C1D' },
        { id: 'w3-t11', text: 'DataLoader — N+1 problem solve karna', tag: 'GraphQL', tagBg: '#FAECE7', tagColor: '#993C1D' },
        { id: 'w3-t12', text: 'GraphQL + JWT Auth + Apollo Cache strategies', tag: 'GraphQL', tagBg: '#FAECE7', tagColor: '#993C1D' },
      ]},
      { title: 'AWS + Docker', tasks: [
        { id: 'w3-t13', text: 'AWS Lambda + API Gateway — serverless project banao', tag: 'AWS', tagBg: '#FAEEDA', tagColor: '#633806' },
        { id: 'w3-t14', text: 'AWS S3 — file upload + storage', tag: 'AWS', tagBg: '#FAEEDA', tagColor: '#633806' },
        { id: 'w3-t15', text: 'Docker — MERN app containerize + docker-compose', tag: 'Docker', tagBg: '#FAEEDA', tagColor: '#633806' },
        { id: 'w3-t16', text: 'GitHub Actions — CI/CD pipeline setup revise', tag: 'CI/CD', tagBg: '#FAEEDA', tagColor: '#633806' },
      ]},
      { title: 'DSA — Week 3', tasks: [
        { id: 'w3-dsa', text: 'Remove Nth Node, Binary Search, Search Rotated Array, First Last Position, Inorder Traversal, Max Depth, Validate BST, Level Order BFS (8 questions)', tag: 'DSA', tagBg: '#EAF3DE', tagColor: '#27500A' },
      ]},
    ],
  },
  {
    id: 4, badge: 'Week 4', title: 'System Design + Interview Questions', days: 'Day 25–31',
    badgeBg: '#FAEEDA', badgeColor: '#633806',
    sections: [
      { title: 'System Design — Alex Xu Book', tasks: [
        { id: 'w4-t1', text: 'Chapter 1 — Scale From Zero to Millions', tag: 'Design', tagBg: '#E1F5EE', tagColor: '#085041' },
        { id: 'w4-t2', text: 'Chapter 3 — Interview Framework', tag: 'Design', tagBg: '#E1F5EE', tagColor: '#085041' },
        { id: 'w4-t3', text: 'Chapter 8 — URL Shortener design', tag: 'Design', tagBg: '#E1F5EE', tagColor: '#085041' },
        { id: 'w4-t4', text: 'Chapter 12 — Chat System design', tag: 'Design', tagBg: '#E1F5EE', tagColor: '#085041' },
        { id: 'w4-t5', text: 'Chapter 11 — News Feed design', tag: 'Design', tagBg: '#E1F5EE', tagColor: '#085041' },
        { id: 'w4-t6', text: 'Chapter 14 — YouTube design', tag: 'Design', tagBg: '#E1F5EE', tagColor: '#085041' },
        { id: 'w4-t7', text: 'Chapter 15 — Google Drive design', tag: 'Design', tagBg: '#E1F5EE', tagColor: '#085041' },
        { id: 'w4-t8', text: 'Har chapter ke baad blank paper pe draw karo', tag: 'Practice', tagBg: '#E1F5EE', tagColor: '#085041' },
      ]},
      { title: 'Interview Questions', tasks: [
        { id: 'w4-t9', text: 'JavaScript — top 30 questions revise', tag: 'JS', tagBg: '#FAEEDA', tagColor: '#633806' },
        { id: 'w4-t10', text: 'React — top 50 questions revise', tag: 'React', tagBg: '#E6F1FB', tagColor: '#0C447C' },
        { id: 'w4-t11', text: 'Node.js — top 30 questions revise', tag: 'Node', tagBg: '#FAEEDA', tagColor: '#633806' },
        { id: 'w4-t12', text: 'MongoDB — top 30 questions revise', tag: 'MongoDB', tagBg: '#E1F5EE', tagColor: '#085041' },
        { id: 'w4-t13', text: 'Next.js — top 20 questions revise', tag: 'Next.js', tagBg: '#EEEDFE', tagColor: '#3C3489' },
        { id: 'w4-t14', text: 'GraphQL — top 20 questions revise', tag: 'GraphQL', tagBg: '#FAECE7', tagColor: '#993C1D' },
        { id: 'w4-t15', text: 'Socket.io — top 15 questions revise', tag: 'Socket', tagBg: '#E6F1FB', tagColor: '#0C447C' },
        { id: 'w4-t16', text: 'Mock interview — Pramp.com pe 3 interviews do', tag: 'Mock', tagBg: '#FCEBEB', tagColor: '#791F1F' },
      ]},
      { title: 'DSA — Week 4', tasks: [
        { id: 'w4-dsa', text: 'Lowest Common Ancestor, Climbing Stairs, House Robber, Coin Change, Fibonacci, LCS, Knapsack, Unique Paths (8 questions)', tag: 'DSA', tagBg: '#EAF3DE', tagColor: '#27500A' },
      ]},
    ],
  },
  {
    id: 5, badge: 'Week 5', title: 'Mock Interviews + Weak Topics Revise', days: 'Day 32–38',
    badgeBg: '#E6F1FB', badgeColor: '#0C447C',
    sections: [
      { title: 'Mock + Revision', tasks: [
        { id: 'w5-t1', text: 'Pramp.com — 5 mock interviews this week', tag: 'Mock', tagBg: '#FCEBEB', tagColor: '#791F1F' },
        { id: 'w5-t2', text: 'Weak topics identify + revise karo', tag: 'Revise', tagBg: '#FAEEDA', tagColor: '#633806' },
        { id: 'w5-t3', text: 'System Design — 5 designs paper pe draw karo', tag: 'Design', tagBg: '#E1F5EE', tagColor: '#085041' },
        { id: 'w5-t4', text: 'GitHub — best projects pin + README polish', tag: 'GitHub', tagBg: '#E6F1FB', tagColor: '#0C447C' },
        { id: 'w5-t5', text: 'HR questions practice — gap answer, salary negotiation', tag: 'HR', tagBg: '#EAF3DE', tagColor: '#27500A' },
      ]},
      { title: 'DSA — Week 5', tasks: [
        { id: 'w5-dsa', text: 'Graph BFS/DFS, Topological Sort, Dijkstra basics, Union Find (8 questions)', tag: 'DSA', tagBg: '#EAF3DE', tagColor: '#27500A' },
      ]},
    ],
  },
  {
    id: 6, badge: 'Week 6', title: 'Offer Week — Full Throttle!', days: 'Day 39–45',
    badgeBg: '#378ADD', badgeColor: '#fff',
    sections: [
      { title: 'Job Apply', tasks: [
        { id: 'w6-t1', text: 'LinkedIn — Remote Senior MERN+GraphQL — 18-20 LPA — 10/day', tag: 'Apply', tagBg: '#FCEBEB', tagColor: '#791F1F' },
        { id: 'w6-t2', text: 'Naukri.com — MERN + GraphQL — 18-20 LPA filter', tag: 'Apply', tagBg: '#FCEBEB', tagColor: '#791F1F' },
        { id: 'w6-t3', text: 'Wellfound.com + Turing.com + Arc.dev apply', tag: 'Apply', tagBg: '#FCEBEB', tagColor: '#791F1F' },
      ]},
      { title: 'Freelancing', tasks: [
        { id: 'w6-t4', text: 'Upwork — 10 proposals daily — $30-40/hr', tag: 'Upwork', tagBg: '#EAF3DE', tagColor: '#27500A' },
        { id: 'w6-t5', text: 'Toptal.com — elite freelancing apply', tag: 'Upwork', tagBg: '#EAF3DE', tagColor: '#27500A' },
      ]},
      { title: 'Final', tasks: [
        { id: 'w6-t6', text: 'Confidently 18-20 LPA maango — negotiate karo!', tag: 'Negotiate', tagBg: '#E6F1FB', tagColor: '#0C447C' },
        { id: 'w6-t7', text: 'Follow up — sab applications pe LinkedIn message bhejo', tag: 'Apply', tagBg: '#FCEBEB', tagColor: '#791F1F' },
      ]},
    ],
  },
]

export const getAllTaskIds = () => weeks.flatMap(w => w.sections.flatMap(s => s.tasks.map(t => ({ taskId: t.id, weekId: w.id }))))
