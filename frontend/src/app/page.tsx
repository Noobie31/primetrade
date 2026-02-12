'use client';

import Link from 'next/link';
import { ArrowRight, Shield, Zap, Lock } from 'lucide-react';

export default function Home() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-primary-900">
            {/* Animated background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute w-96 h-96 bg-primary-500/20 rounded-full blur-3xl -top-48 -left-48 animate-pulse-slow"></div>
                <div className="absolute w-96 h-96 bg-primary-600/20 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="relative z-10 container mx-auto px-6 py-16">
                {/* Header */}
                <nav className="flex justify-between items-center mb-20">
                    <div className="flex items-center space-x-2">
                        <Shield className="w-8 h-8 text-primary-400" />
                        <h1 className="text-2xl font-bold text-white">PrimeTrade</h1>
                    </div>
                    <div className="space-x-4">
                        <Link
                            href="/login"
                            className="px-6 py-2 text-white hover:text-primary-400 transition-colors"
                        >
                            Login
                        </Link>
                        <Link
                            href="/register"
                            className="px-6 py-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-all hover:shadow-lg hover:shadow-primary-500/50"
                        >
                            Get Started
                        </Link>
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="text-center max-w-4xl mx-auto animate-fade-in">
                    <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                        Scalable Task Management
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">
                            with Role-Based Access
                        </span>
                    </h2>
                    <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                        A modern REST API with JWT authentication, secure role management, and a beautiful interface built with MERN stack.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Link
                            href="/register"
                            className="group px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition-all hover:shadow-xl hover:shadow-primary-500/50 flex items-center gap-2"
                        >
                            Start Free Trial
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/login"
                            className="px-8 py-4 glass-effect-dark text-white rounded-lg font-semibold hover:bg-white/10 transition-all"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>

                {/* Features */}
                <div className="grid md:grid-cols-3 gap-8 mt-24 max-w-6xl mx-auto">
                    <div className="glass-effect-dark p-8 rounded-2xl hover:bg-white/10 transition-all animate-slide-up">
                        <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mb-4">
                            <Lock className="w-6 h-6 text-primary-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">Secure Authentication</h3>
                        <p className="text-gray-400">
                            JWT-based authentication with password hashing and token management for maximum security.
                        </p>
                    </div>

                    <div className="glass-effect-dark p-8 rounded-2xl hover:bg-white/10 transition-all animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mb-4">
                            <Shield className="w-6 h-6 text-primary-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">Role-Based Access</h3>
                        <p className="text-gray-400">
                            Granular permissions with user and admin roles for complete access control.
                        </p>
                    </div>

                    <div className="glass-effect-dark p-8 rounded-2xl hover:bg-white/10 transition-all animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mb-4">
                            <Zap className="w-6 h-6 text-primary-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">Modern Tech Stack</h3>
                        <p className="text-gray-400">
                            Built with MongoDB, Express, React, and Node.js for optimal performance and scalability.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-24 text-gray-400">
                    <p>Backend Developer Intern Assignment © 2026</p>
                </div>
            </div>
        </main>
    );
}
