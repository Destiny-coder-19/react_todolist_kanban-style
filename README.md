# Overview
This is a simple and interactive Kanban-style Todo List application built with React. It allows users to:

1) Add new todos
2) Move todos between "Pending" and "Completed" lanes via drag-and-drop
3) Toggle completion using checkboxes
4) Delete todos

----------------------------------------------------------------------------------------------------------
# Structure

# Component Structure
1) Modular design with separate components for Board, Lane, TodoCard, and AddTodo.
2) Global state is managed using React Context (TodoContext) to avoid prop drilling.
3) Custom hook (useApi) encapsulates all API logic, making it reusable and testable.

# State Management
1) Local UI state is managed in each component (useState for form inputs, drag handling).
2) Shared data like todos and API methods are provided globally via Context.

# Optimizations
1) React.memo is used in TodoCard to avoid unnecessary re-renders unless props change.
2) useCallback is applied in Board and passed to children to memoize handlers.
3) State updates in useApi are batched for better performance.

----------------------------------------------------------------------------------------------------------
# Known Limitations

1) The current drag logic only works for changing status; there’s no support for reordering.
2) No offline support: The app requires a network connection to function correctly.

----------------------------------------------------------------------------------------------------------
# Possible Enhancements

1) Add search and filter features for todos.
2) Add animations when items move between lists.
3) Enhance error handling and loader with messages for better UI.