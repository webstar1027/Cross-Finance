import React from 'react'
import { useTranslation } from 'contexts/Localization'
import { Link } from '@crosswiselabs/uikit'
import Page from '../Page'
import { Title, SubTitle, SubTopic, ContentText } from './styled'

const Policy: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Page title={t('Privacy Policy')}>
      <ContentText>
        This Privacy Policy (the &quot;Privacy Policy&quot;) explains how Crosswise Labs PTE LTD. collects, uses,
        processes, discloses, shares, transfers, and protects &quot;You/Your&quot;personal information obtained through
        Crosswise DEX and its partners through its Crosswise decentralized exchange (the &quot;Crosswise DEX&quot;) and
        its operators (the parties that run Crosswise DEX, including but not limited to legal representatives and its
        teams that provide Crosswise DEX Services (the &quot;Crosswise DEX Services&quot; Crosswise DEX and Crosswise
        DEX operators are referred to as &quot;We,&quot; &quot;Us,&quot; and &quot;Our.”)
        <br />
        <br />
        We request reasonable and legitimate personal information from users, strictly in accordance with applicable
        laws, because we are required to collect such information by applicable laws or government orders, or it is
        relevant for our specified purposes and for providing the required Crosswise DEX Services to You.
        <br />
        <br />
        This Privacy Policy is written in line with the General Data Protection Regulation (GDPR), as we follow the
        appropriate personal information processing standards within the European Economic Area (EEA). We apply standard
        contractual terms, depend on the European Commission&apos;s adequacy rulings on specific countries, and get your
        consent for these data transfers to third countries as needed by relevant laws.
        <br />
        <br />
        It is critical that you thoroughly read the entirety of our Privacy Policy. When you visit Crosswise DEX,
        regardless of whether you register for or log in to the Crosswise DEX Services, you recognize, understand, and
        consent to all of the items specified in this Privacy Policy. Without previous notification and your approval,
        your personal information will not be used for any purpose not permitted by this Privacy Policy or any relevant
        agreement (including any other business rules of Crosswise Labs PTE LTD.).
      </ContentText>

      <Title>1. Lawfully Obtained Information</Title>
      <ContentText>
        The categories of information we legitimately and legally gather when you register for and use Crosswise DEX
        Services are as follows:
      </ContentText>

      <SubTitle>1.1 Your Provided Information During Registration and/or Connection to the Platform</SubTitle>
      <ContentText>
        You supply us with your legitimate information while using Crosswise DEX services, which may include your email
        address, name, date of birth, nationality, country code, gender, address, password, and other information to
        help us identify you (&quot;Identification Information&quot;).
      </ContentText>

      <SubTitle>1.2 Information Collection for Regulatory Policy Compliance</SubTitle>
      <ContentText>
        Compliance with worldwide and locally relevant industry and regulatory standards, as well as government
        regulations, in areas such as Anti-Money Laundering (AML), Anti-Bribery Compliance (ABC), Know-Your-Client
        (KYC), and Counter-Terrorist Financing (CTF). Identity documents (including passport, driver&apos;s license,
        national identity card, state ID card, tax ID number, passport number, driver&apos;s license details, national
        identity card details, visa information, etc.), proof of address, source of fund declaration, purposes of fund
        documents, and source of wealth (&quot;Regulatory Information&quot;) may also be important and required for
        Crosswise DEX.
        <br />
        <br />
        Each time we collect information, we will explain and notify you of the content and requirements of such
        personal information, and we reserve the right to change the content and requirements of the collected
        Regulatory Information and Identification Information in accordance with globally accepted industry standards,
        local regulatory standards, or government orders.
      </ContentText>

      <SubTitle>1.3 Collection of Information During Use of Crosswise DEX Services</SubTitle>
      <ContentText>
        You supply us with your legitimate information while using Crosswise DEX services, which may include your email
        address, name, date of birth, nationality, country code, gender, address, password, and other information to
        help us identify you (&quot;Identification Information&quot;).
      </ContentText>
      <SubTopic>Service Usage Information</SubTopic>
      <ContentText>
        We may monitor and collect tracking information related to usage during Your access and use of Crosswise DEX
        Services, including but not limited to your phone number, access date and time, device type and device
        identification, operating system and hardware setting, browser type, and information derived from SIM card,
        network operator, IP address, GPS, base station, and WLAN (&quot;Service Usage Information&quot;). Crosswise DEX
        may collect this information directly or through third-party service providers. The gathering of Service Usage
        Information assists our systems in ensuring that our interface is available to users across all platforms and
        can be used to aid in criminal investigations.
      </ContentText>
      <SubTopic>Communication Information</SubTopic>
      <ContentText>
        You acknowledge and agree that we have the right to collect and use the information included in or linked to the
        communication that you provide to us or produced through your use of Crosswise DEX Services (&quot;Communication
        Information&quot;) for the purposes indicated in this Privacy Policy.
        <br />
        <br />
        i. any messages, requests, or other information sent during your relationship with Crosswise DEX;
        <br />
        <br />
        ii. any messages and file attachments related to your transactions with other users, as well as other data
        created largely via your dealings with them.
      </ContentText>
      <SubTopic>Transactional Information</SubTopic>
      <ContentText>
        Crosswise DEX may collect transaction information from user accounts as you use Crosswise DEX Services, such as
        deposit snapshots, account balances, trade history (such as transaction initiation, payment method, price,
        quantity, time, withdrawal and authorization information), order activity, and distribution history
        (&quot;Transaction Information&quot;). We gather such transaction information to monitor suspicious accounts and
        trading behavior for the purposes of protecting users from fraud, resolving legal issues, and any other
        objectives mentioned in this Privacy Policy.
      </ContentText>
      <SubTopic>Financial Information</SubTopic>
      <ContentText>
        You understand and agree that we have the right to collect and use the data or information contained in or
        related to your financial information when you use Crosswise DEX Services for the purposes outlined in this
        Privacy Policy, including without limitation, bank account information, payment card primary account number
        (PAN), transaction history, trading data, and/or tax identification. We gather this information to monitor any
        unusual financial behavior for the purposes of user fraud protection, legal case resolution, and any other
        objectives mentioned in this Privacy Policy.
      </ContentText>

      <Title>2. Information Collection Processes</Title>
      <SubTitle>2.1 Automatically Collected Information</SubTitle>
      <ContentText>
        The majority of the Identification Information that we gather is supplied directly by you. The following are the
        circumstances in which we may collect and process Your information:
        <br />
        <br />
        a. when you register, log in, or visit Crosswise DEX, or when you use any Crosswise DEX Services;
        <br />
        <br />
        b. your voluntary participation of any user survey or submission of feedback to us through email or other means;
        <br />
        <br />
        c. when browser cookies are used to access or utilise{' '}
        <Link style={{ display: 'inline-block' }} href="https://crosswise.finance/" target="_blank">
          https://crosswise.finance/
        </Link>{' '}
        or APPs;
        <br />
        <br />
        d. any other instances in which we may automatically acquire your information as described in this Privacy
        Policy.
      </ContentText>

      <SubTitle>2.2 Anonymized and Aggregated Data</SubTitle>
      <ContentText>
        Anonymization is a data processing technology that eliminates or alters personal information so that it can no
        longer be linked to a specific person. Except for this section, none of this Privacy Policy&apos;s other rules
        apply to anonymized or aggregated personal data (i.e. information about our Users that we combine together so
        that it no longer identifies or references an individual User).
        <br />
        <br />
        We may utilize anonymized or aggregate customer data for any business purpose, including improving our goods and
        services, conducting business intelligence and marketing, and detecting security issues. We may conduct our own
        analytics on anonymized data or permit third-party analytics.
      </ContentText>

      <SubTitle>2.3 Information Collected Through Third Party Sources</SubTitle>
      <ContentText>
        You acknowledge and agree that we may get any reasonably needed Identification Information about you from
        third-party sources, including but not limited to the methods listed below:
        <br />
        <br />
        a. public databases, credit bureaus, and partners for ID verification;
        <br />
        <br />
        b. blockchain information;
        <br />
        <br />
        c. marketing and reselling partners;
        <br />
        <br />
        d. advertising and analytics service providers
      </ContentText>

      <Title>3. Usage of Collected Information</Title>
      <ContentText>
        We use your collected information lawfully for the following purposes and in the following ways:
      </ContentText>
      <SubTitle>3.1 To Provide and Maintain Crosswise DEX Services</SubTitle>
      <ContentText>
        We utilize the gathered information to offer, maintain, and improve Crosswise DEX Services (including, but not
        limited to transaction processing) and to authenticate Users&apos; identities.
        <br />
        <br />
        To assist us authenticate your identity and activity and deliver Crosswise DEX Services, we use the IP address
        and unique identifiers contained in your device&apos;s cookies. We cannot offer you with all or partial
        Crosswise DEX Services without data such as Identification Information, Supervision Information, Service Usage
        Information, Communication Information, and Transaction Information due to our legal duties and technical needs.
      </ContentText>

      <SubTitle>3.2 To Protect Our Users</SubTitle>
      <ContentText>
        We use the information collected to protect our platforms, users&apos; accounts, and archives.
        <br />
        <br />
        We use IP addresses and cookies to protect against automated abuse such as spam, phishing, and Distributed
        Denial of Service (DDoS) attacks.
        <br />
        <br />
        We analyze trading activities with the goal of detecting suspicious behavior as early as possible to prevent
        potential fraud and loss of funds to bad actors.
      </ContentText>

      <SubTitle>3.3 To Comply with Legal and Regulatory Requirements</SubTitle>
      <ContentText>
        In terms of personal information privacy and security, we shall utilize the information in accordance with our
        legal requirements, government demands, and reasonable user-generated questions. We may handle your personal
        information without your agreement in circumstances where it is strictly essential, such as to safeguard the
        vital interests of users or other natural people, to fulfill a public interest purpose, or to pursue our
        legitimate purposes (but not to harm the interests of users). Except in the cases specified in this Privacy
        Policy or any relevant agreement, we will not divulge or transmit any of your personal information to third
        parties without first obtaining approval from our legal team and/or the users&apos; prior authorization.
      </ContentText>

      <SubTitle>3.4 For Measurement, Research and Development</SubTitle>
      <ContentText>
        We actively collect and analyze data in order to better understand how you use and interact with Crosswise DEX
        Services. Our operations teams do this evaluation activity to continuously enhance our Crosswise DEX performance
        and handle user experience concerns. Furthermore, we utilize such information to tailor, measure, and optimize
        Crosswise DEX Services as well as the content and appearance of our websites and applications, as well as to
        create new services.
      </ContentText>

      <SubTitle>3.5 To Communicate with You</SubTitle>
      <ContentText>
        We may utilize gathered personal information, such as your phone number or email address, to contact with you
        directly when giving customer assistance on a ticket or to keep you updated on logins, transactions, account
        security, and other elements. We will be unable to reply to your submitted requests, questions, and enquiries
        unless we gather and handle your personal information for validating each correspondence. All direct
        communications are appropriately stored at Crosswise DEX or the service provider selected by Crosswise DEX,
        where they can be examined for correctness, maintained as evidence, or utilized to fulfill any statutory or
        contractual responsibilities.
      </ContentText>

      <SubTitle>3.6 To Enforce Any Applicable Agreements</SubTitle>
      <ContentText>
        The collected information is also used to constantly and actively enforce our applicable agreements with our
        Users, including but not limited to reviewing, investigating, and preventing any potentially prohibited or
        illegal activities that may violate the foregoing provisions, or disclosing the relevant information to a third
        party in accordance with the foregoing provisions.
        <br />
        <br />
        Crosswise DEX retains the right to suspend or terminate the supply of any Crosswise DEX Services to any user who
        is determined to be engaging in actions that violate our user agreements.
      </ContentText>

      <SubTitle>3.7 To Facilitate Corporate Acquisitions, Mergers or Transactions</SubTitle>
      <ContentText>
        We reserve the right to handle any information pertaining to your Crosswise DEX Account and usage of Crosswise
        DEX Services that is required in the context of corporate acquisitions, mergers, or other corporate
        transactions.
      </ContentText>

      <SubTitle>3.8 For Marketing and Advertising</SubTitle>
      <ContentText>
        We may share your personal information with our marketing partners for the purposes of targeting, modeling,
        and/or analytics as well as marketing and advertising.
      </ContentText>

      <SubTitle>3.9 For Rebates</SubTitle>
      <ContentText>
        We may share the information collected, including but not limited to your Identification Information and
        Transaction Information, with your referrer for the purposes of rebates and other benefits.
      </ContentText>

      <SubTitle>3.10 For Any Other Purpose</SubTitle>
      <ContentText>We may disclose your personal information for any other purpose you consent to.</ContentText>

      <Title>4. Marketing</Title>
      <ContentText>
        If we believe you would be interested in certain Crosswise DEX Services or products and services from our
        partners, we will keep you informed.
        <br />
        <br />
        If you accept to receive the aforementioned marketing material, you may opt out at any point in the future.
        <br />
        <br />
        You have the right to ask us to cease contacting you for marketing reasons or sending you relevant information
        at any time. If you do not wish to be contacted for marketing reasons in the future, please unsubscribe by
        clicking on the unsubscribe link at the bottom of the marketing email and submitting your request.
      </ContentText>

      <Title>5. How We Store and Protect User Data</Title>
      <ContentText>
        Crosswise DEX has kept your personal information safe by storing it in fault-tolerant secure storage using
        industry standard encryption and implementing a variety of security procedures to guarantee that it is not lost,
        abused, or altered, including, but not limited to:
      </ContentText>
      <SubTitle>5.1 Physical Measures</SubTitle>
      <ContentText>Materials containing your personal information will be stored in a locked place.</ContentText>
      <SubTitle>5.2 Electronic Measures</SubTitle>
      <ContentText>
        Computer data containing your personal information will be stored in the computer systems and storage media that
        are subject to strict log-in restrictions.
      </ContentText>
      <SubTitle>5.3 Physical Measures</SubTitle>
      <ContentText>
        Only authorized employees are permitted to come into contact with your personal information and such employees
        must comply with our internal confidentiality rules for personal data. We have also imposed strict physical
        access controls to buildings and files.
      </ContentText>
      <SubTitle>5.4 Physical Measures</SubTitle>
      <ContentText>
        We use various currently available general security technologies and supporting management systems to transmit
        and store your personal information and to minimize the risks that your information may be disclosed, damaged,
        misused, accessed without authorization, disclosed without authorization, or altered.
      </ContentText>
      <SubTitle>5.5 Physical Measures</SubTitle>
      <ContentText>
        The &quot;firewall&quot; protects our web server.
        <br />
        <br />
        Please keep in mind that it is impossible to ensure complete information security. As a result, we ask that you
        realize your duty to take independent security safeguards to secure your own personal information. To the
        greatest extent permissible by law, you agree that we will not be liable for any information leakage or other
        damages not caused by our purpose or gross negligence, including but not limited to hacker attack, power outage,
        or unavoidable technological failure.
        <br />
        <br />
        If you feel that your personal information, particularly your account and/or password information, has been
        hacked, please lock your Crosswise DEX account and immediately notify the Crosswise DEX customer service staff
        at{' '}
        <Link style={{ display: 'inline-block' }} href="mailto:contact@crosswise.finance" target="_blank">
          contact@crosswise.finance
        </Link>
        .
        <br />
        <br />
        Unless otherwise specified by law or the applicable agreement, you accept that we have the right, but not the
        duty, to keep all gathered personal information for the duration of your Crosswise DEX and for a further 5 years
        after the account is closed.
      </ContentText>

      <Title>6. Transfers of Personal Information</Title>
      <ContentText>
        You understand that we have the right to have all or some of the collected personal information transferred to
        or stored in other countries or regions than your country of nationality, your country of residence, or the
        country where the server is, without your specific consent, under the following circumstances:
      </ContentText>
      <SubTitle>
        6.1 If it is essential to reasonably protect, handle, analyze, or utilize personal information
      </SubTitle>
      <SubTitle>6.2 If it is essential to enforce our users&apos; other agreements</SubTitle>
      <SubTitle>6.3 If it is in the public&apos;s interest</SubTitle>
      <SubTitle>
        6.4 If it is necessary to establish, exercise, or defend the rights of us, our partners, or other users
      </SubTitle>
      <SubTitle>6.5 Other circumstances asserted by law or government orders</SubTitle>

      <Title>7. Cookies</Title>
      <ContentText>
        Cookies are little pieces of data that are transmitted to your browser and kept on your computer&apos;s hard
        disk in order to gather basic internet log information and visitor activity data. When you visit Crosswise DEX,
        we may gather information about you automatically through cookies or similar technologies.
      </ContentText>
      <SubTitle>7.1 Usage of Cookies</SubTitle>
      <ContentText>
        We utilize cookies in a variety of ways to improve your Crosswise DEX experience, including but not limited to:
        <br />
        <br />
        a. to keep you registered;
        <br />
        <br />
        b. to keep track of your surfing history and preferences when using Crosswise DEX;
        <br />
        <br />
        c. to use cookies to track our performance and verify the efficacy of online advertising using Google Stats.
      </ContentText>
      <SubTitle>7.2 What Type of Cookies Do We Use?</SubTitle>
      <ContentText>
        We use different types of cookies, including but not limited to:
        <br />
        <br />
        a. Functional Cookies
        <br />
        <br />
        We use such cookies to help us identify you and remember your previous preferences and settings, which may
        include your device, your operating system, your preferred language, your location, and other session data. We
        use a mix of first-party and third-party cookies.
        <br />
        <br />
        b. Cookies for Marketing
        <br />
        <br />
        We gather information about your visit to Crosswise DEX, the material you read, the links you click, and other
        information about your browsers, devices, IP addresses, and referral URLs using these cookies. We occasionally
        share portions of the gathered data with other parties for marketing reasons. We may also share cookie-collected
        web data with our marketing partners. This implies that when you visit another website, you may be served
        adverts based on your Crosswise DEX surfing behaviors.
      </ContentText>
      <SubTitle>7.3 Cookie Management</SubTitle>
      <ContentText>
        Most browsers are set to accept cookies by default. You may configure your browser to avoid cookies or to inform
        you when cookies are loaded. However, disabling all cookies may prevent you from accessing or using any
        Crosswise DEX services.
      </ContentText>

      <Title>8. Data Protection Rights</Title>
      <SubTitle>8.1 Right of Access</SubTitle>
      <ContentText>
        You have the right to access or obtain copies of your personal information. We may charge a reasonable fee for
        providing the access service.
      </ContentText>
      <SubTitle>8.2 Right to Rectification</SubTitle>
      <ContentText>
        You have the right to correct your personal information that you deem inaccurate. You also have the right to ask
        us to complete the personal information that you deem incomplete within a reasonable limit.
      </ContentText>
      <SubTitle>8.3 Right to Erasure</SubTitle>
      <ContentText>
        You have the right to request the erasure of your personal data under certain circumstances.
      </ContentText>
      <SubTitle>8.4 Right to Restriction of Processing</SubTitle>
      <ContentText>
        You have the right to request that we restrict the processing of your personal information in certain instances,
        as required by law or as expressly reminded by us; nevertheless, you acknowledge that such restriction of
        processing may prohibit us from providing you with any Crosswise DEX Services.
      </ContentText>
      <SubTitle>8.5 Right to Object</SubTitle>
      <ContentText>
        You have the right to object to the processing of your personal information in some instances, as required by
        law or as expressly reminded by us; nevertheless, you acknowledge that such objection to processing may prohibit
        us from providing you with any Crosswise DEX Services.
      </ContentText>
      <SubTitle>8.6 Right to Data Portability</SubTitle>
      <ContentText>
        Under certain circumstances as required by Law or as specifically reminded by us, you have the right to request
        us to transmit the personal information that we collect to another body, or directly to you. We may charge a
        reasonable fee for providing the transmission service.
      </ContentText>

      <Title>9. Privacy Policies of Other Websites</Title>
      <SubTitle>9.1 Privacy Policy of Non-Crosswise DEX Websites</SubTitle>
      <ContentText>
        If you use the links on Crosswise DEX to access other third-party platforms or partners&apos; websites or
        applications, you must agree to and adhere by their distinct and independent privacy rules. We are not
        responsible for the information or actions on this website.
      </ContentText>
      <SubTitle>9.2 Privacy Policy of Crosswise DEX</SubTitle>
      <ContentText>
        This Privacy Policy applies to all Crosswise DEX and Crosswise Labs platforms, websites, and departments. If you
        follow a link to any of Crosswise DEX&apos;s sub-platforms, you must agree to and abide by their unique and
        independent privacy rules. If a sub-privacy platform&apos;s policy contradicts with this Privacy Policy, the
        privacy policy of that sub-platform takes precedence.
      </ContentText>

      <Title>10. Changes to this Privacy Policy</Title>
      <ContentText>
        Crosswise DEX may amend this Privacy Policy from time to time to reflect changes in the law or our personal-data
        gathering, processing, and usage policies. Any changes to this Privacy Policy will be posted on{' '}
        <Link style={{ display: 'inline-block' }} href="/privacy" target="_blank">
          https://crosswise.finance/privacy
        </Link>
        . You must examine the Privacy Policy on a regular basis and be aware of any changes. If you do not agree with
        the amended material, you must immediately discontinue using Crosswise DEX. When a revised version of the
        Privacy Policy is made available, your continuing use of Crosswise DEX indicates that you accept the modified
        content and agree to comply by the amended Privacy Policy.
      </ContentText>

      <Title>11. Contact Us</Title>
      <ContentText>
        We are dedicated to protecting the liberties and rights of all Crosswise DEX users. If you have any questions or
        issues about our Privacy Statement, or if you want to make a data protection request, please contact us at{' '}
        <Link style={{ display: 'inline-block' }} href="mailto:contact@crosswise.finance" target="_blank">
          contact@crosswise.finance
        </Link>
        .
      </ContentText>
    </Page>
  )
}

export default Policy
