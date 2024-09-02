import { toast } from "react-hot-toast";
import css from "./SesrchBar.module.css"
import { BiSearch } from "react-icons/bi";


const SesrchBar = ({ handleSearch }) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const searchInput = form.elements.searchInput.value.trim();
        if (searchInput === "") {
            toast("Enter a query in the search field.", {
                style: {
                    border: '1px solid black',
                    padding: '16px',
                    background: '#b9e2fa'
                },
                icon: "⚠︎",
                position: "top-right"
            });
            return;
        }
        handleSearch(searchInput);
        form.reset();
    }

    return (
        <header className={css.header}>
            <form onSubmit={handleSubmit}>
                <div className={css.wrapper}>
                    <input
                        className={css["search-input"]}
                        type="text"
                        name="searchInput"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                    />
                    <button type="submit" className={css["search-button"]}><BiSearch /></button>
                </div>
            </form>
        </header>

    );
};

export default SesrchBar;
