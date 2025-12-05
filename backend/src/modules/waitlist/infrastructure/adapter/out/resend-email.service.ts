import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class ResendEmailService {
  private readonly logger = new Logger(ResendEmailService.name);
  private readonly resend: Resend;
  private readonly notificationEmail = 'contact@reasoninglayer.ai';
  private readonly fromEmail: string;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('RESEND_API_KEY');
    if (!apiKey) {
      this.logger.warn('RESEND_API_KEY not configured');
    }
    this.resend = new Resend(apiKey);
    this.fromEmail =
      this.configService.get<string>('RESEND_FROM_EMAIL') ||
      'onboarding@resend.dev';
  }

  async sendWaitlistNotification(subscriberEmail: string): Promise<boolean> {
    try {
      const subscribedAt = new Date();

      const result = await this.resend.emails.send({
        from: this.fromEmail,
        to: this.notificationEmail,
        subject: `New ReasoningLayer Waitlist: ${subscriberEmail}`,
        html: this.buildBrandedEmail(subscriberEmail, subscribedAt),
      });

      if (result.error) {
        this.logger.error(
          `Failed to send notification: ${result.error.message}`,
        );
        return false;
      }

      this.logger.log(`Waitlist notification sent for: ${subscriberEmail}`);
      return true;
    } catch (error) {
      this.logger.error(`Error sending notification: ${error.message}`);
      return false;
    }
  }

  async sendWelcomeEmail(subscriberEmail: string): Promise<boolean> {
    try {
      const result = await this.resend.emails.send({
        from: this.fromEmail,
        to: subscriberEmail,
        subject: "Welcome to ReasoningLayer - You're on the Waitlist!",
        html: this.buildWelcomeEmail(subscriberEmail),
      });

      if (result.error) {
        this.logger.error(
          `Failed to send welcome email: ${result.error.message}`,
        );
        return false;
      }

      this.logger.log(`Welcome email sent to: ${subscriberEmail}`);
      return true;
    } catch (error) {
      this.logger.error(`Error sending welcome email: ${error.message}`);
      return false;
    }
  }

  private buildBrandedEmail(email: string, subscribedAt: Date): string {
    const formattedDate = subscribedAt.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    });

    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="dark">
  <title>New Waitlist Signup - ReasoningLayer</title>
</head>
<body style="margin: 0; padding: 0; background-color: #030014; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #030014;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%;">

          <!-- Header with Logo -->
          <tr>
            <td align="center" style="padding-bottom: 32px;">
              <table role="presentation" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding-right: 12px;">
                    <!-- Orb SVG -->
                    <div style="width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #00d4ff 0%, #3b82f6 50%, #8b5cf6 100%); box-shadow: 0 0 30px rgba(0, 212, 255, 0.4);"></div>
                  </td>
                  <td>
                    <span style="font-size: 24px; font-weight: 600; background: linear-gradient(90deg, #00d4ff, #3b82f6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">ReasoningLayer</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content Card -->
          <tr>
            <td>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; overflow: hidden;">

                <!-- Accent Bar -->
                <tr>
                  <td style="height: 4px; background: linear-gradient(90deg, #00d4ff 0%, #3b82f6 100%);"></td>
                </tr>

                <!-- Badge -->
                <tr>
                  <td align="center" style="padding: 32px 32px 16px 32px;">
                    <table role="presentation" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="background: rgba(0, 212, 255, 0.15); border: 1px solid rgba(0, 212, 255, 0.3); border-radius: 9999px; padding: 8px 16px;">
                          <table role="presentation" cellspacing="0" cellpadding="0">
                            <tr>
                              <td style="padding-right: 8px;">
                                <div style="width: 8px; height: 8px; background-color: #00d4ff; border-radius: 50%; box-shadow: 0 0 8px #00d4ff;"></div>
                              </td>
                              <td style="color: #00d4ff; font-size: 13px; font-weight: 500; letter-spacing: 0.5px;">
                                NEW SIGNUP
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Title -->
                <tr>
                  <td align="center" style="padding: 0 32px 24px 32px;">
                    <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff; line-height: 1.3;">
                      Someone joined the<br>
                      <span style="color: #00d4ff;">Waitlist</span>
                    </h1>
                  </td>
                </tr>

                <!-- Email Info Card -->
                <tr>
                  <td style="padding: 0 32px 32px 32px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: rgba(0, 0, 0, 0.3); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px;">
                      <tr>
                        <td style="padding: 24px;">
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                            <!-- Email Row -->
                            <tr>
                              <td style="padding-bottom: 16px; border-bottom: 1px solid rgba(255,255,255,0.08);">
                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                                  <tr>
                                    <td style="color: rgba(255,255,255,0.65); font-size: 12px; text-transform: uppercase; letter-spacing: 1px; padding-bottom: 6px;">
                                      Email Address
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <a href="mailto:${email}" style="color: #00d4ff; font-size: 18px; font-weight: 600; text-decoration: none;">
                                        ${email}
                                      </a>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            <!-- Date Row -->
                            <tr>
                              <td style="padding-top: 16px;">
                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                                  <tr>
                                    <td style="color: rgba(255,255,255,0.65); font-size: 12px; text-transform: uppercase; letter-spacing: 1px; padding-bottom: 6px;">
                                      Signed Up
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style="color: #ffffff; font-size: 15px;">
                                      ${formattedDate}
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- CTA Button -->
                <tr>
                  <td align="center" style="padding: 0 32px 32px 32px;">
                    <a href="mailto:${email}" style="display: inline-block; padding: 14px 28px; background: linear-gradient(90deg, #00d4ff 0%, #3b82f6 100%); color: #ffffff; font-size: 15px; font-weight: 600; text-decoration: none; border-radius: 10px; box-shadow: 0 4px 20px rgba(0, 212, 255, 0.3);">
                      Reply to ${email.split('@')[0]}
                    </a>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 32px 20px;">
              <table role="presentation" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding-bottom: 16px;">
                    <span style="color: rgba(255,255,255,0.6); font-size: 13px;">
                      Neuro-Symbolic AI Platform
                    </span>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <span style="color: rgba(255,255,255,0.5); font-size: 12px;">
                      This is an automated notification from ReasoningLayer waitlist.
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();
  }

  private buildWelcomeEmail(email: string): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="dark">
  <title>Welcome to ReasoningLayer</title>
</head>
<body style="margin: 0; padding: 0; background-color: #030014; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #030014;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%;">

          <!-- Header with Logo -->
          <tr>
            <td align="center" style="padding-bottom: 32px;">
              <table role="presentation" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding-right: 12px;">
                    <!-- Orb SVG -->
                    <div style="width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #00d4ff 0%, #3b82f6 50%, #8b5cf6 100%); box-shadow: 0 0 30px rgba(0, 212, 255, 0.4);"></div>
                  </td>
                  <td>
                    <span style="font-size: 24px; font-weight: 600; background: linear-gradient(90deg, #00d4ff, #3b82f6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">ReasoningLayer</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content Card -->
          <tr>
            <td>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; overflow: hidden;">

                <!-- Accent Bar -->
                <tr>
                  <td style="height: 4px; background: linear-gradient(90deg, #00d4ff 0%, #3b82f6 100%);"></td>
                </tr>

                <!-- Badge -->
                <tr>
                  <td align="center" style="padding: 32px 32px 16px 32px;">
                    <table role="presentation" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 9999px; padding: 8px 16px;">
                          <table role="presentation" cellspacing="0" cellpadding="0">
                            <tr>
                              <td style="padding-right: 8px;">
                                <div style="width: 8px; height: 8px; background-color: #10b981; border-radius: 50%; box-shadow: 0 0 8px #10b981;"></div>
                              </td>
                              <td style="color: #34d399; font-size: 13px; font-weight: 500; letter-spacing: 0.5px;">
                                YOU'RE IN
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Title -->
                <tr>
                  <td align="center" style="padding: 0 32px 24px 32px;">
                    <h1 style="margin: 0; font-size: 32px; font-weight: 700; color: #ffffff; line-height: 1.3;">
                      Welcome to the<br>
                      <span style="background: linear-gradient(90deg, #00d4ff, #3b82f6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">ReasoningLayer Waitlist</span>
                    </h1>
                  </td>
                </tr>

                <!-- Introduction Text -->
                <tr>
                  <td style="padding: 0 32px 32px 32px;">
                    <p style="margin: 0 0 20px 0; color: rgba(255,255,255,0.8); font-size: 16px; line-height: 1.6; text-align: center;">
                      Thank you for joining us on this journey to revolutionize AI with neuro-symbolic intelligence. You're now part of an exclusive group getting early access to the future of reasoning.
                    </p>
                  </td>
                </tr>

                <!-- What's Next Section -->
                <tr>
                  <td style="padding: 0 32px 32px 32px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: rgba(0, 0, 0, 0.3); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px;">
                      <tr>
                        <td style="padding: 24px;">
                          <h2 style="margin: 0 0 20px 0; color: #ffffff; font-size: 18px; font-weight: 600;">
                            What happens next?
                          </h2>

                          <!-- Feature 1 -->
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 16px;">
                            <tr>
                              <td style="width: 32px; vertical-align: top; padding-top: 2px;">
                                <div style="width: 24px; height: 24px; border-radius: 6px; background: linear-gradient(135deg, #00d4ff, #3b82f6); display: flex; align-items: center; justify-content: center;">
                                  <span style="color: #ffffff; font-weight: 600; font-size: 14px;">1</span>
                                </div>
                              </td>
                              <td>
                                <p style="margin: 0; color: #ffffff; font-size: 15px; font-weight: 500; margin-bottom: 4px;">
                                  Early Access Priority
                                </p>
                                <p style="margin: 0; color: rgba(255,255,255,0.75); font-size: 14px; line-height: 1.5;">
                                  You'll be among the first to access ReasoningLayer when we launch
                                </p>
                              </td>
                            </tr>
                          </table>

                          <!-- Feature 2 -->
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 16px;">
                            <tr>
                              <td style="width: 32px; vertical-align: top; padding-top: 2px;">
                                <div style="width: 24px; height: 24px; border-radius: 6px; background: linear-gradient(135deg, #3b82f6, #8b5cf6); display: flex; align-items: center; justify-content: center;">
                                  <span style="color: #ffffff; font-weight: 600; font-size: 14px;">2</span>
                                </div>
                              </td>
                              <td>
                                <p style="margin: 0; color: #ffffff; font-size: 15px; font-weight: 500; margin-bottom: 4px;">
                                  Exclusive Updates
                                </p>
                                <p style="margin: 0; color: rgba(255,255,255,0.75); font-size: 14px; line-height: 1.5;">
                                  Get behind-the-scenes insights and progress updates directly in your inbox
                                </p>
                              </td>
                            </tr>
                          </table>

                          <!-- Feature 3 -->
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                            <tr>
                              <td style="width: 32px; vertical-align: top; padding-top: 2px;">
                                <div style="width: 24px; height: 24px; border-radius: 6px; background: linear-gradient(135deg, #8b5cf6, #00d4ff); display: flex; align-items: center; justify-content: center;">
                                  <span style="color: #ffffff; font-weight: 600; font-size: 14px;">3</span>
                                </div>
                              </td>
                              <td>
                                <p style="margin: 0; color: #ffffff; font-size: 15px; font-weight: 500; margin-bottom: 4px;">
                                  Founder Pricing
                                </p>
                                <p style="margin: 0; color: rgba(255,255,255,0.75); font-size: 14px; line-height: 1.5;">
                                  Lock in special pricing available only to early supporters
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Quote Section -->
                <tr>
                  <td style="padding: 0 32px 32px 32px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: rgba(0, 212, 255, 0.08); border-left: 3px solid #00d4ff; border-radius: 8px;">
                      <tr>
                        <td style="padding: 20px 24px;">
                          <p style="margin: 0 0 12px 0; color: rgba(255,255,255,0.9); font-size: 15px; line-height: 1.6; font-style: italic;">
                            "We're building a platform that doesn't just process information—it <strong style="color: #00d4ff;">reasons</strong>, <strong style="color: #3b82f6;">learns</strong>, and <strong style="color: #8b5cf6;">adapts</strong>. Together, we're shaping the future of AI."
                          </p>
                          <p style="margin: 0; color: rgba(255,255,255,0.65); font-size: 13px; font-weight: 500;">
                            — The ReasoningLayer Team
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Stay Connected -->
                <tr>
                  <td align="center" style="padding: 0 32px 32px 32px;">
                    <p style="margin: 0 0 16px 0; color: rgba(255,255,255,0.8); font-size: 14px;">
                      Have questions or want to learn more?
                    </p>
                    <a href="mailto:contact@reasoninglayer.ai" style="display: inline-block; padding: 12px 24px; background: rgba(255,255,255,0.1); color: #00d4ff; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 8px; border: 1px solid rgba(0, 212, 255, 0.3);">
                      Get in Touch
                    </a>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 32px 20px;">
              <table role="presentation" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding-bottom: 12px;">
                    <span style="color: rgba(255,255,255,0.6); font-size: 13px; font-weight: 500;">
                      Neuro-Symbolic AI Platform
                    </span>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-bottom: 12px;">
                    <span style="color: rgba(255,255,255,0.5); font-size: 12px;">
                      You're receiving this because you joined the ReasoningLayer waitlist.
                    </span>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <span style="color: rgba(255,255,255,0.45); font-size: 11px;">
                      © ${new Date().getFullYear()} ReasoningLayer. All rights reserved.
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();
  }
}
