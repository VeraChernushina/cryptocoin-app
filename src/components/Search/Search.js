import './Search.css';

const Search = ({ onSearchFilter }) => {
  const changeHandler = (event) => {
    onSearchFilter(event.target.value);
  };

  return (
    <form className='coin-search'>
      <input
        type='text'
        className='coin-input'
        placeholder='Search'
        onChange={changeHandler}
      />
    </form>
  );
};

export default Search;
