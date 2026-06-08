import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import '@testing-library/jest-dom'
import LoginPage from './LoginPage'

describe('LoginPage', () => {
  it('renders email and password fields and a submit button', () => {
    render(<LoginPage />)

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('shows an error when submitting with empty email', async () => {
    render(<LoginPage />)

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }))

    expect(await screen.findByRole('alert')).toHaveTextContent('Email is required')
  })

  it('shows an error when submitting with empty password', async () => {
    const user = userEvent.setup()
    render(<LoginPage />)

    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }))

    expect(await screen.findByRole('alert')).toHaveTextContent('Password is required')
  })

  it('calls onLogin with email and password on valid submission', async () => {
    const user = userEvent.setup()
    const onLogin = vi.fn()
    render(<LoginPage onLogin={onLogin} />)

    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/password/i), 'secret123')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    expect(onLogin).toHaveBeenCalledOnce()
    expect(onLogin).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'secret123',
    })
  })

  it('does not show an error on a valid submission', async () => {
    const user = userEvent.setup()
    render(<LoginPage onLogin={() => {}} />)

    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/password/i), 'secret123')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})
