const TextButton = ({ ml, resetFiltersHandler }: { ml: number, resetFiltersHandler: () => void }) => {
  return <button onClick={resetFiltersHandler}
                 style={{
                   marginLeft: ml,
                   backgroundColor: 'transparent',
                   border: 'none',
                   cursor: 'pointer',
                   height: 42,
                 }}><span
    style={{ fontStyle: 'Inter', fontWeight: 500, fontSize: '14px', color: '#7B7C88' }}>Reset filters</span></button>;
};

export default TextButton;