import { Link } from "react-router-dom";
export const Navbar = () => {

  return (
    <header className="border-b z-50 right-0 left-0 top-0 fixed">
      <div>
        <div>
          {/* <Link to="#">BlogAI</Link> */}
          <h3>BlogAI</h3>

          <div>
            <div>
              <input 
                type="text"
                placeholder="Search Blog"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
