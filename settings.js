/**
 * @param {number} temperature - Controls the creativity of the response (0-1)
 * @param {number} max_tokens - Maximum length of the response (1-4000)
 * @param {number} top_p - Controls the diversity of the response (0-1)
 * @param {number} frequency_penalty - Penalizes words that appear too often in the model (0-2)
 * @param {number} presence_penalty - Penalizes words that appear too often in the response (0-2)
 * @param {string} stop - Word at which the response will stop
 */

const settings = {
  model: "code-davinci-002",
  prompt:
    '/* Debug this code */\n\nimport React from "react";\nimport { Navigate } from "react-router-dom";\n\nfunction Navigation() {\n  return (\n    <nav className="nav">\n      <ul className="nav__list">\n        <li className="nav__item">\n          <Navigate to="/" className="nav_link">\n            Home\n          </Navigate>\n        </li>\n        <li className="nav__item">\n          <Navigate to="/login" className="nav_link">\n            Login\n          </Navigate>\n        </li>\n          <Navigate to="/register" className="nav_link">\n            Register\n          </Navigate>\n        </li>\n      </ul>\n    </nav>\n    \n  );\n}\n\nexport default Navigation;',
  temperature: 0.53,
  max_tokens: 528,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
};

module.exports = settings;
