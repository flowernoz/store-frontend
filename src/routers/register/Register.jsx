import { useState } from 'react'
import './Register.css'

export const Register = () => {
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const [role, setRole] = useState('')
  const handleSubmit = () => {
    setFirstname('')
    setLastname('')
    setUsername('')
    setEmail('')
    setPassword('')
    setPhone('')
    setAge('')
    setGender('')
    setRole('')
  }
  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <p>Royxatdan otish</p>
        <input
          type="text"
          placeholder="Enter your firsname"
          value={firstname}
          onChange={e => setFirstname(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter your lastname"
          value={lastname}
          onChange={e => setLastname(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="+998902220536"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Enter your age"
          value={age}
          onChange={e => setAge(e.target.value)}
          required
        />
        <div className="select">
          <select
            value={gender}
            onChange={e => setGender(e.target.value)}
            id="form__select_gender"
          >
            <option value="male">Erkak</option>
            <option value="female">Ayol</option>
          </select>
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            id="form__select_role"
          >
            <option value="admin">Admin</option>
            <option value="user">Foydalanuvchi</option>
          </select>
        </div>
        <button>Submit</button>
      </form>
    </div>
  )
}
