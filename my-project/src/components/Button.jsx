export function Button({ variant, children, ...props }) {
    return (
      <button
        className={`btn ${variant === 'outline' ? 'btn-outline' : 'btn-default'}`}
        {...props}
      >
        {children}
      </button>
    );
  }
  