function TestComponent() {
  const clickHandler = () => {
    return <h1>This is a second component</h1>;
  };

  return (
    <diV>
      <button onClick={clickHandler}>Click to jump to second page!</button>
    </diV>
  );
}

export default TestComponent;
