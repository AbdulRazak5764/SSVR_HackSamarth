'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Header } from '@/components/navigation/Header';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 items-center md:grid-cols-2">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 text-balance leading-tight">
                Your AI Digital Twin for Risk Assessment
              </h1>
              <p className="mt-6 text-xl text-gray-600 text-balance">
                Understand your personal risk profile across health, financial,
                and cybersecurity dimensions with advanced AI analysis and
                SHAP explanations.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/dashboard">
                  <Button size="lg" className="w-full sm:w-auto">
                    Start Assessment
                  </Button>
                </Link>
                <Link href="/history">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    View History
                  </Button>
                </Link>
              </div>
            </div>

            {/* Feature preview */}
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 blur-3xl" />
              <Card className="relative p-8 bg-white/40 backdrop-blur border-white/20">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                      <span className="text-xl">♥️</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Health Risk</h3>
                      <p className="text-sm text-gray-600">
                        Lifestyle & wellness factors
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100">
                      <span className="text-xl">💰</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Financial Risk
                      </h3>
                      <p className="text-sm text-gray-600">
                        Income & debt patterns
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                      <span className="text-xl">🔒</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Scam Risk</h3>
                      <p className="text-sm text-gray-600">
                        Fraud vulnerability score
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="py-20 px-6 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-xl text-gray-600">
              Our AI-powered system provides detailed insights into your risk profile
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Comprehensive Input
              </h3>
              <p className="text-gray-600">
                Provide detailed information about your health, finances, and digital habits across three easy-to-use steps.
              </p>
            </Card>

            <Card className="p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <span className="text-2xl">🧠</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                AI Analysis
              </h3>
              <p className="text-gray-600">
                Advanced machine learning models analyze your data to predict risk scores in each category with high accuracy.
              </p>
            </Card>

            <Card className="p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                SHAP Explanations
              </h3>
              <p className="text-gray-600">
                Understand exactly which factors contribute most to your risk score with explainable AI insights.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Risk Categories Section */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center">
            Risk Categories
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl bg-gradient-to-br from-red-50 to-red-100 p-8 border border-red-200">
              <h3 className="text-2xl font-bold text-red-900 mb-4">Health Risk</h3>
              <ul className="space-y-3 text-red-800">
                <li>• Exercise frequency</li>
                <li>• Sleep quality</li>
                <li>• Stress levels</li>
                <li>• Alcohol consumption</li>
                <li>• Smoking status</li>
                <li>• Diet quality</li>
                <li>• Medical history</li>
              </ul>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 p-8 border border-amber-200">
              <h3 className="text-2xl font-bold text-amber-900 mb-4">
                Financial Risk
              </h3>
              <ul className="space-y-3 text-amber-800">
                <li>• Monthly income</li>
                <li>• Expense patterns</li>
                <li>• Savings rate</li>
                <li>• Debt ratio</li>
                <li>• Investment knowledge</li>
                <li>• Emergency fund</li>
                <li>• Credit score</li>
              </ul>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 p-8 border border-purple-200">
              <h3 className="text-2xl font-bold text-purple-900 mb-4">
                Scam Risk
              </h3>
              <ul className="space-y-3 text-purple-800">
                <li>• Technical literacy</li>
                <li>• Online activity</li>
                <li>• Info privacy</li>
                <li>• Password hygiene</li>
                <li>• Verification habits</li>
                <li>• Past incidents</li>
                <li>• Security awareness</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold text-white">
            Ready to Understand Your Risk Profile?
          </h2>
          <p className="mt-4 text-xl text-blue-100">
            Get started with a comprehensive risk assessment in just a few minutes
          </p>
          <div className="mt-8">
            <Link href="/dashboard">
              <Button
                size="lg"
                variant="secondary"
                className="font-semibold"
              >
                Start Your Assessment
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 px-6 py-12 text-gray-400">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                  <span className="text-white font-bold text-sm">DT</span>
                </div>
                <span className="font-bold text-white">Digital Twin</span>
              </div>
              <p className="text-sm">AI-powered personal risk assessment</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/dashboard" className="hover:text-white">Assessment</Link></li>
                <li><Link href="/history" className="hover:text-white">History</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2026 Digital Twin. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
