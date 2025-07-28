'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import { 
  CreditCard, 
  ArrowLeft,
  Crown,
  Calendar,
  DollarSign,
  Download,
  Plus,
  Edit3,
  Trash2,
  Check,
  X,
  AlertTriangle,
  Star,
  Zap,
  Users,
  Shield,
  Clock,
  FileText,
  ExternalLink
} from 'lucide-react';

interface Subscription {
  id: string;
  plan: 'free' | 'pro' | 'enterprise';
  status: 'active' | 'canceled' | 'past_due';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  amount: number;
  currency: string;
}

interface PaymentMethod {
  id: string;
  type: 'card' | 'bank';
  brand: string;
  last4: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
}

interface Invoice {
  id: string;
  date: string;
  amount: number;
  currency: string;
  status: 'paid' | 'pending' | 'failed';
  description: string;
  downloadUrl: string;
}

function BillingPageContent() {
  const { user } = useAuth();
  const router = useRouter();
  
  // Mock data - replace with API calls
  const [subscription, setSubscription] = useState<Subscription>({
    id: 'sub_123',
    plan: 'pro',
    status: 'active',
    currentPeriodStart: '2024-01-01',
    currentPeriodEnd: '2024-02-01',
    cancelAtPeriodEnd: false,
    amount: 29.99,
    currency: 'USD'
  });

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: 'pm_123',
      type: 'card',
      brand: 'visa',
      last4: '4242',
      expiryMonth: 12,
      expiryYear: 2025,
      isDefault: true
    },
    {
      id: 'pm_456',
      type: 'card',
      brand: 'mastercard',
      last4: '5555',
      expiryMonth: 8,
      expiryYear: 2026,
      isDefault: false
    }
  ]);

  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: 'inv_123',
      date: '2024-01-01',
      amount: 29.99,
      currency: 'USD',
      status: 'paid',
      description: 'Pro Plan - Monthly',
      downloadUrl: '#'
    },
    {
      id: 'inv_456',
      date: '2023-12-01',
      amount: 29.99,
      currency: 'USD',
      status: 'paid',
      description: 'Pro Plan - Monthly',
      downloadUrl: '#'
    },
    {
      id: 'inv_789',
      date: '2023-11-01',
      amount: 29.99,
      currency: 'USD',
      status: 'paid',
      description: 'Pro Plan - Monthly',
      downloadUrl: '#'
    }
  ]);

  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showAddPaymentDialog, setShowAddPaymentDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      currency: 'USD',
      interval: 'month',
      features: [
        'Basic AI patterns access',
        '5 projects per month',
        'Community support',
        'Basic templates'
      ],
      icon: Star,
      popular: false
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 29.99,
      currency: 'USD',
      interval: 'month',
      features: [
        'All AI patterns and techniques',
        'Unlimited projects',
        'Priority support',
        'Advanced templates',
        'Custom integrations',
        'Team collaboration'
      ],
      icon: Zap,
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 99.99,
      currency: 'USD',
      interval: 'month',
      features: [
        'Everything in Pro',
        'Dedicated account manager',
        'Custom training sessions',
        'SLA guarantees',
        'Advanced security',
        'White-label options'
      ],
      icon: Users,
      popular: false
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-900/20 text-green-400 border-green-800/50',
      canceled: 'bg-red-900/20 text-red-400 border-red-800/50',
      past_due: 'bg-yellow-900/20 text-yellow-400 border-yellow-800/50',
      paid: 'bg-green-900/20 text-green-400 border-green-800/50',
      pending: 'bg-yellow-900/20 text-yellow-400 border-yellow-800/50',
      failed: 'bg-red-900/20 text-red-400 border-red-800/50'
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${styles[status as keyof typeof styles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
      </span>
    );
  };

  const handleCancelSubscription = async () => {
    setLoading(true);
    setError('');

    try {
      // TODO: Implement API call to cancel subscription
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubscription(prev => ({ ...prev, cancelAtPeriodEnd: true }));
      setSuccess('Subscription will be canceled at the end of the billing period.');
      setShowCancelDialog(false);
    } catch (err: any) {
      setError(err.message || 'Failed to cancel subscription');
    } finally {
      setLoading(false);
    }
  };

  const handleReactivateSubscription = async () => {
    setLoading(true);
    setError('');

    try {
      // TODO: Implement API call to reactivate subscription
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubscription(prev => ({ ...prev, cancelAtPeriodEnd: false }));
      setSuccess('Subscription reactivated successfully.');
    } catch (err: any) {
      setError(err.message || 'Failed to reactivate subscription');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePlan = async (planId: string) => {
    setLoading(true);
    setError('');

    try {
      // TODO: Implement API call to change plan
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newPlan = plans.find(p => p.id === planId);
      if (newPlan) {
        setSubscription(prev => ({ 
          ...prev, 
          plan: planId as any,
          amount: newPlan.price
        }));
        setSuccess(`Plan changed to ${newPlan.name} successfully.`);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to change plan');
    } finally {
      setLoading(false);
    }
  };

  const handleSetDefaultPayment = async (paymentMethodId: string) => {
    setLoading(true);
    
    try {
      // TODO: Implement API call to set default payment method
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setPaymentMethods(prev => 
        prev.map(pm => ({ ...pm, isDefault: pm.id === paymentMethodId }))
      );
      setSuccess('Default payment method updated.');
    } catch (err: any) {
      setError(err.message || 'Failed to update payment method');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePayment = async (paymentMethodId: string) => {
    setLoading(true);
    
    try {
      // TODO: Implement API call to delete payment method
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setPaymentMethods(prev => prev.filter(pm => pm.id !== paymentMethodId));
      setSuccess('Payment method removed.');
    } catch (err: any) {
      setError(err.message || 'Failed to remove payment method');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-purple-900/10"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5 text-gray-400" />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-100">Billing</h1>
              <p className="text-gray-400">Manage your subscription and billing information</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-6 bg-red-900/20 border border-red-800/50 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <p className="text-red-400">{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-6 bg-green-900/20 border border-green-800/50 rounded-lg p-4">
            <p className="text-green-400">{success}</p>
          </div>
        )}

        <div className="grid gap-6">
          {/* Current Subscription */}
          <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-100 flex items-center space-x-2">
                <Crown className="w-5 h-5 text-yellow-400" />
                <span>Current Plan</span>
              </h2>
              {getStatusBadge(subscription.status)}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-100 capitalize">
                      {subscription.plan} Plan
                    </h3>
                    <p className="text-2xl font-bold text-gray-100">
                      ${subscription.amount}
                      <span className="text-sm text-gray-400 font-normal">/month</span>
                    </p>
                  </div>
                </div>

                {subscription.cancelAtPeriodEnd && (
                  <div className="mb-4 p-3 bg-yellow-900/20 border border-yellow-800/50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-400" />
                      <p className="text-sm text-yellow-400">
                        Your subscription will be canceled on {formatDate(subscription.currentPeriodEnd)}
                      </p>
                    </div>
                  </div>
                )}

                <div className="space-y-2 text-sm text-gray-400">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Next billing: {formatDate(subscription.currentPeriodEnd)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4" />
                    <span>Amount: ${subscription.amount} {subscription.currency}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-3">
                {subscription.cancelAtPeriodEnd ? (
                  <button
                    onClick={handleReactivateSubscription}
                    disabled={loading}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg transition-colors duration-200"
                  >
                    Reactivate Subscription
                  </button>
                ) : (
                  <button
                    onClick={() => setShowCancelDialog(true)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
                  >
                    Cancel Subscription
                  </button>
                )}
                
                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-100 rounded-lg transition-colors duration-200">
                  View Usage
                </button>
              </div>
            </div>
          </div>

          {/* Available Plans */}
          <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800 p-6 shadow-2xl">
            <h2 className="text-xl font-semibold text-gray-100 mb-6">Available Plans</h2>
            
            <div className="grid gap-4 md:grid-cols-3">
              {plans.map((plan) => {
                const Icon = plan.icon;
                const isCurrentPlan = subscription.plan === plan.id;
                
                return (
                  <div
                    key={plan.id}
                    className={`relative p-6 rounded-lg border transition-all duration-200 ${
                      isCurrentPlan
                        ? 'border-blue-500 bg-blue-500/10'
                        : plan.popular
                        ? 'border-purple-500 bg-purple-500/5'
                        : 'border-gray-700 bg-gray-800/30'
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                        <span className="px-3 py-1 bg-purple-600 text-white text-xs font-medium rounded-full">
                          Most Popular
                        </span>
                      </div>
                    )}
                    
                    <div className="text-center mb-4">
                      <Icon className={`w-8 h-8 mx-auto mb-2 ${
                        isCurrentPlan ? 'text-blue-400' : 'text-gray-400'
                      }`} />
                      <h3 className="text-lg font-semibold text-gray-100">{plan.name}</h3>
                      <div className="mt-2">
                        <span className="text-2xl font-bold text-gray-100">
                          ${plan.price}
                        </span>
                        <span className="text-gray-400">/{plan.interval}</span>
                      </div>
                    </div>

                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2 text-sm text-gray-300">
                          <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => !isCurrentPlan && handleChangePlan(plan.id)}
                      disabled={isCurrentPlan || loading}
                      className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
                        isCurrentPlan
                          ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      {isCurrentPlan ? 'Current Plan' : `Upgrade to ${plan.name}`}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-100 flex items-center space-x-2">
                <CreditCard className="w-5 h-5" />
                <span>Payment Methods</span>
              </h2>
              <button
                onClick={() => setShowAddPaymentDialog(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
              >
                <Plus className="w-4 h-4" />
                <span>Add Payment Method</span>
              </button>
            </div>

            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700/50"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-gray-100 font-medium">
                        {method.brand.toUpperCase()} •••• {method.last4}
                      </p>
                      <p className="text-sm text-gray-400">
                        Expires {method.expiryMonth.toString().padStart(2, '0')}/{method.expiryYear}
                        {method.isDefault && (
                          <span className="ml-2 px-2 py-0.5 bg-blue-600/20 text-blue-400 text-xs rounded">
                            Default
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {!method.isDefault && (
                      <button
                        onClick={() => handleSetDefaultPayment(method.id)}
                        className="px-3 py-1 text-sm text-gray-400 hover:text-gray-300 transition-colors duration-200"
                      >
                        Set Default
                      </button>
                    )}
                    <button
                      onClick={() => handleDeletePayment(method.id)}
                      disabled={method.isDefault}
                      className="p-1 text-red-400 hover:text-red-300 disabled:text-gray-600 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Billing History */}
          <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800 p-6 shadow-2xl">
            <h2 className="text-xl font-semibold text-gray-100 mb-6 flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Billing History</span>
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700/50">
                    <th className="text-left py-3 text-sm font-medium text-gray-400">Date</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-400">Description</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-400">Amount</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-400">Status</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b border-gray-800/50">
                      <td className="py-4 text-sm text-gray-300">{formatDate(invoice.date)}</td>
                      <td className="py-4 text-sm text-gray-300">{invoice.description}</td>
                      <td className="py-4 text-sm text-gray-300">
                        ${invoice.amount} {invoice.currency}
                      </td>
                      <td className="py-4">{getStatusBadge(invoice.status)}</td>
                      <td className="py-4">
                        <button className="flex items-center space-x-1 text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200">
                          <Download className="w-4 h-4" />
                          <span>Download</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Cancel Subscription Dialog */}
        {showCancelDialog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold text-gray-100 mb-4">Cancel Subscription</h3>
              <p className="text-gray-400 mb-6">
                Are you sure you want to cancel your subscription? You'll continue to have access until the end of your billing period.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowCancelDialog(false)}
                  className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-100 rounded-lg transition-colors duration-200"
                >
                  Keep Subscription
                </button>
                <button
                  onClick={handleCancelSubscription}
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white rounded-lg transition-colors duration-200"
                >
                  {loading ? 'Canceling...' : 'Cancel Subscription'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Payment Method Dialog */}
        {showAddPaymentDialog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold text-gray-100 mb-4">Add Payment Method</h3>
              <p className="text-gray-400 mb-6">
                Payment method integration would be implemented here with Stripe, PayPal, or other payment processors.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowAddPaymentDialog(false)}
                  className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-100 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowAddPaymentDialog(false)}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                >
                  Add Method
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function BillingPage() {
  return (
    <ProtectedRoute>
      <BillingPageContent />
    </ProtectedRoute>
  );
}