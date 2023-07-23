import React from 'react'
import { useTranslation } from 'contexts/Localization'
import { Link } from '@crosswiselabs/uikit'
import Page from '../Page'
import { SubTitle, SubTopic, ContentText } from './styled'

const Terms: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Page title={t('Terms of Use')}>
      <ContentText>
        These Terms of Use (this “Agreement”) constitutes a legally binding contract between Crosswise Labs PTE LTD.
        (“Company”), a private Limited Company based in Singapore, having its corporate address at 68 CIRCULAR ROAD
        #02-01, SINGAPORE (049422) (“Company”, “we”, “us”, “our”) and you with respect to your use of our website at
        <Link mx="8px" style={{ display: 'inline-block' }} href="/" target="_blank">
          crosswise.finance
        </Link>
        (collectively, the “Site”). By accessing or using the site, you are accepting these terms of use (the “terms”)
        (on behalf of yourself or the entity that you represent), and you represent and warrant that you have the right,
        authority, and capacity to enter into this agreement (on behalf of yourself or the entity that you represent).
        If you do not agree with all of the provisions of this agreement, do not access and/or use the site.
        <br />
        <br />
        Be advised that this Agreement contains disclaimers of warranties and limitations on liability that may be
        applicable to you.
      </ContentText>
      <SubTitle>Section 1: Changes to this Agreement</SubTitle>
      <ContentText>
        We reserve the right to change the terms and conditions of this Agreement by providing you with notice of such
        changes, such as providing notice through the Site, or updating the “Last Updated” date at the beginning of this
        Agreement. Any changes we make will be effective immediately upon providing notice to you. Your continued use of
        the Site will constitute your acceptance of any such updated Agreement terms. Be sure to return to this page
        periodically to ensure familiarity with the most current version of this Agreement.
      </ContentText>

      <SubTitle>Section 2: Rules Governing Your Use of the Site</SubTitle>
      <ContentText>
        The Site will provide you with information relating to our services and the use of tokens crosswise.finance
        offers.
        <br />
        You represent and warrant that you are old enough legally a on your country of residence and have the full
        right, power, and authority to enter into and perform this Agreement without the consent or approval of any
        third party.
        <br />
        You may not use the Site, or assist or encourage any other party, to engage in any of the following prohibited
        activities:
        <br />
        <ul>
          <li>
            Violating any applicable law, statute, ordinance, or regulation, or encouraging any conduct that could
            constitute a criminal offense or give rise to civil liability;
          </li>
          <li>Copying, framing, or mirroring any part of the Site;</li>
          <li>Permitting any third party to access the Site;</li>
          <li>
            Publishing, transmitting, distributing, or storing content, material, information, or data that:
            <div style={{ marginLeft: '20px' }}>
              (a) is illegal, obscene, defamatory, libelous, threatening, harassing, abusive, or hateful or that
              advocates violence or threatens the health of others;
              <br />
              (b) is harmful to or interferes with the Site or any third party’s networks, equipment, applications,
              services, or websites (e.g., viruses, worms, Trojan horses, etc.);
              <br />
              (c) infringes, dilutes, misappropriates, or otherwise violates any privacy, intellectual property,
              publicity, or other personal rights including, without limitation, copyrights, patents, trademarks, trade
              secrets, or other proprietary information (including unauthorized use of domain names); or
              <br />
              (d) is fraudulent or contains false, deceptive, or misleading statements, claims, or representations (such
              as “phishing”);
            </div>
          </li>
          <li>
            Attempting to disrupt, degrade, impair, or violate the integrity or security of the Site or the computers,
            services, accounts, or networks of any other party (including, without limitation, “hacking,” “denial of
            service” attacks, etc.), including any activity that typically precedes attempts to breach security such as
            scanning, probing, or other testing or vulnerability assessment activity, or engaging in or permitting any
            network or hosting activity that results in the blacklisting or other blockage of the Company internet
            protocol space;
          </li>
          <li>
            Collecting or harvesting any personally identifiable information, including account names, from the Site;
          </li>
          <li>
            Impersonating another person or otherwise misrepresenting your affiliation with a person or entity,
            conducting fraud, hiding or attempting to hide your identity;
          </li>
          <li>
            Submitting to the Site or to the Company any personally identifiable information, except as requested by the
            Company;
          </li>
          <li>Bypassing the measures we may use to prevent or restrict access to the Site;</li>
          <li>
            Transmitting any trade secret or other material, non-public information about any person, company, or entity
            without the authorization to do so;
          </li>
          <li>Removing any copyright, trademark, or other proprietary rights notices contained in or on the Site;</li>
          <li>
            Sublicensing, selling, renting, leasing, transferring, assigning, or conveying any rights under this
            Agreement to any third party, except as expressly permitted herein;
          </li>
        </ul>
        <br />
        Executing any form of network monitoring or running a network analyzer or packet sniffer or other technology to
        intercept, decode, mine, or display any packets used to communicate between the Company’s servers or any data
        not intended for you; and/or Harvesting or collecting information about any Site visitors or members.
        <br />
        Improper use of the Site may result in termination of your access to and use of the Site, and/or civil or
        criminal liabilities. You agree to use the Site in accordance with all applicable laws and regulations.
        <br />
        Users and purchasers of crypto assets must be made aware of certain illustrative risk factors as set out in
        Appendix A.
      </ContentText>

      <SubTitle>Section 3: Intellectual Property</SubTitle>
      <ContentText>
        <b>3.1 Your Rights.</b> The Company grants you a limited, revocable right to access and use the Site solely for
        your own internal, non-commercial use. Use of the Site for any other purpose is strictly prohibited. You must
        not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish,
        download, store, or transmit any of the material on the Site. Except as expressly set forth herein, no rights or
        licenses are granted to you under this Agreement, whether by implication, estoppel, or otherwise.
        <br />
        <br />
        <b>3.2 Company Rights.</b> The Site and its contents are owned and operated by the Company. The Site and its
        contents are protected by international copyright, trademark, and other laws and will remain the property of the
        Company. The Company reserves all rights not expressly granted herein in the Site. You acknowledge that you do
        not acquire any ownership rights by using the Site. The trademarks, logos, and service marks displayed on the
        Site (collectively, the “Company Trademarks”) are the registered and unregistered trademarks of the Company.
        Nothing contained in this Agreement, or the Site should be construed as granting, by implication, estoppel, or
        otherwise, any license or right to use any Company Trademarks without the express written permission of the
        Company.
      </ContentText>

      <SubTitle>Section 4: Privacy</SubTitle>
      <ContentText>
        Please refer to our Privacy Policy at
        <Link mx="8px" style={{ display: 'inline-block' }} href="/privacy" target="_blank">
          crosswise.finance/privacy
        </Link>
        for information about how we collect, use and share your information.
      </ContentText>

      <SubTitle>Section 5: Term & Termination</SubTitle>
      <ContentText>
        This Agreement is effective from the date on which you first access the Site and shall remain effective until
        terminated in accordance with its terms. The Company may immediately terminate this Agreement, and/or your
        access to and use of the Site, or any portion thereof, at any time and for any reason, with or without cause, by
        providing notice to you. The Company may also terminate this Agreement immediately if you fail to comply with
        any term or provision of this Agreement. Upon termination of this Agreement by either party, your right to
        access and use the Site shall immediately cease and you shall cease all access and use of the Site.
        <br />
        <br />
        Upon termination or expiration of this Agreement for any reason, Sections 1, 2, 3.2, 4 and 11 shall survive.
        <br />
        <br />
        We reserve the right at any time and from time to time to modify or discontinue, temporarily or permanently, the
        Site, or any part or portion thereof. You agree that we shall not be liable to you or to any third party for any
        modification, suspension, or discontinuance of the Site, or any part or portion thereof. Nothing in this
        Agreement shall be construed to obligate the Company to maintain and support the Site, or any part or portion
        thereof, during the term of this Agreement.
      </ContentText>

      <SubTitle>Section 6: Disclaimers</SubTitle>
      <ContentText>
        The site is provided “as is” and “with all faults” and without warranties of any kind, either express or
        implied, and all warranties, express or implied, including, without limitation, implied warranties of title,
        non-infringement, accuracy, completeness, merchantability, fitness for a particular purpose, any warranties that
        may arise from course of dealing, course of performance, or usage of trade, and any warranties that the site is
        current and/or up-to-date are hereby expressly disclaimed to the fullest extent permissible under applicable
        law.
        <br />
        <br />
        There is no warranty, representation, or guarantee that the site, or your use of the site, will be
        uninterrupted, complete, accurate, current, reliable, error-free, secure, or that any problems will be
        corrected, or that the site, or any information, software, or other material accessible from the site, is free
        of viruses or other harmful components. we do not warrant, guarantee, or make any representation regarding the
        use of, or the results of the use of, the site and you assume all responsibility and risk for your use of the
        site, and your reliance thereon.
      </ContentText>

      <SubTitle>Section 7: Limitation of Liability</SubTitle>
      <ContentText>
        Notwithstanding the failure of essential purpose of any limited remedy of any kind, neither the company nor any
        of its licensors, sponsors, agents, successors, or assigns, nor our or their directors, officers, employees,
        consultants, or other representatives, are responsible or liable for any incidental, consequential, special,
        exemplary, punitive or other indirect damages (including, without limitation, any loss of profits, lost savings,
        or loss of data) under any contract, negligence, strict liability, or other theory arising out of or relating in
        any manner to your use, or inability to use, the site, whether or not we have been informed of the possibility
        of such damages or liabilities.
        <br />
        <br />
        Some jurisdictions do not allow the exclusion or limitation of certain warranties and/or liabilities, so certain
        of the above limitations or exclusions may not apply to you.
      </ContentText>

      <SubTitle>Section 8: Indemnification</SubTitle>
      <ContentText>
        You agree to fully indemnify, defend (at the Company’s request), and hold the Company, our licensors, suppliers,
        agents, successors, and assigns, and our and their directors, officers, employees, consultants, and other
        representatives (collectively, the “Company Parties”) harmless from and against any and all claims, damages,
        losses, costs (including reasonable attorneys’ fees), and other expenses that arise directly or indirectly out
        of or from:
        <br />
        (a) your actual or alleged breach of this Agreement;
        <br />
        (b) any allegation that any materials you submit to us or transmit to the Site infringe, misappropriate, or
        otherwise violate the copyright, patent, trademark, trade secret, or other intellectual property or other rights
        of any third party;
        <br />
        (c) your activities in connection with the Site;
        <br />
        (d) your negligence or willful misconduct;
        <br />
        (e) your use of the results, content, data, or information provided via the Site;
        <br />
        (f) any service or product offered by you in connection with or related to your use of the Site; and/or
        <br />
        (g) your violation of any laws, rules, regulations, codes, statutes, ordinances, or orders of any governmental
        and quasi-governmental authorities, including, without limitation, allregulatory, administrative and legislative
        authorities.
      </ContentText>

      <SubTitle>Section 9: Jurisdictional Issues</SubTitle>
      <ContentText>
        The Company makes no representation that the Site operates (or is legally permitted to operate) in all
        geographic areas, or that the Site is appropriate or available for use in other locations. Accessing the Site
        from territories where the Site or any content or functionality of the Site or portion thereof is illegal is
        expressly prohibited. If you choose to access the Site, you agree and acknowledge that you do so on your own
        initiative and at your own risk, and that you are solely responsible for compliance with all applicable laws.
      </ContentText>

      <SubTitle>Section 10: Choice of Law and Forum</SubTitle>
      <ContentText>
        This Agreement and your relationship with the Company shall be governed by, and construed and interpreted in
        accordance with, the laws of the Cayman Islands regarding consumers, without regard to its conflict of laws
        principles. The parties irrevocably consent to bring any action to enforce this Agreement in courts located in
        Cayman Islands, and you consent to the exclusive jurisdiction of the located in Cayman Islands.
      </ContentText>

      <SubTitle>Section 11: Miscellaneous</SubTitle>
      <ContentText>
        If any provision of this Agreement is held to be invalid or unenforceable by a court of competent jurisdiction,
        then the remaining provisions will nevertheless remain in full force and effect, and such provision will be
        reformed in a manner to effectuate the original intent of the parties as closely as possible and remain
        enforceable. If such reformation is not possible in a manner that is enforceable, then such term will be severed
        from the remaining terms, and the remaining terms will remain in effect. This is the entire Agreement between
        you and us relating to the subject matter herein and supersedes any and all prior or contemporaneous written or
        oral agreements between you and us with respect to such subject matter. This Agreement may not be changed,
        waived, or modified except by a written instrument signed by the Company. If any employee or third party
        consultant hired by the Company offers to modify this Agreement, he or she is not acting as an agent for the
        Company or speaking on the Company’s behalf. You may not rely, and should not act in reliance on, any statement
        or communication from an employee of the Company or anyone else purporting to act on the Company’s behalf. This
        Agreement is between you and the Company; there are no third-party beneficiaries. No agency, partnership, joint
        venture, employee-employer, or franchiser-franchisee relationship is intended or created by this Agreement.
        Neither this Agreement nor any right, obligation, or remedy hereunder is assignable, transferable, delegable, or
        sublicensable by you except with the Company’s prior written consent, and any attempted assignment, transfer,
        delegation, or sublicense shall be null and void. The Company may assign, transfer, or delegate this Agreement
        or any right or obligation or remedy hereunder in its sole discretion. No waiver by either party of any breach
        or default hereunder shall be deemed to be a waiver of any preceding or subsequent breach or default. Except as
        explicitly stated otherwise, legal notices shall be served on the Company at{' '}
        <Link style={{ display: 'inline-block' }} href="mailto:legal@crosswise.finance" target="_blank">
          legal@crosswise.finance
        </Link>
        .
        <br />
        Notice to you shall be deemed given 24 hours after the e-mail is sent. For just common notices to the platform
        users in charge, you can you head to the Telegram or Discord space. Any heading, caption, or section title
        contained in this Agreement is inserted only as a matter of convenience, and in no way defines or explains any
        section or provision hereof.
        <br />
        <br />
        The Site is Operated By
        <br />
        Crosswise Labs
        <br />
        Effective August 10, 2022
      </ContentText>

      <SubTitle>APPENDIX A</SubTitle>
      <ContentText>CERTAIN RISK FACTORS ASSOCIATED WITH crosswise.finance TOKENS (“CRSS & sCRSS”)</ContentText>

      <SubTopic>
        Risk of Losing Access to CRSS & sCRSS tokens As a Result of Loss of Private Key(s), Custodial Error or Purchaser
        Error
      </SubTopic>
      <ContentText>
        A private key, or a combination of private keys, is necessary to access a digital wallet or vault containing a
        purchaser’s CRSS & sCRSS tokens. As a result, such private key(s) are necessary in order to control, sell and
        otherwise dispose of the CRSS & sCRSS tokens stored in such digital wallet or vault. The loss of the private
        key(s) needed to access such digital wallet or vault containing a purchaser’s CRSS & sCRSS tokens will result in
        such purchaser’s effective loss of such CRSS & sCRSS tokens. Furthermore, any third-party that gains access to
        such private key(s), including by gaining access to login credentials of a digital wallet or vault service that
        a purchaser uses, may be able to misappropriate a purchaser’s CRSS & sCRSS tokens. Any errors or malfunctions
        with respect to the digital wallet or vault a purchaser uses to receive and store CRSS & sCRSS tokens, including
        such purchaser’s failure to properly maintain or use such digital wallet or vault, could also result in such
        purchaser’s effective loss of CRSS & sCRSS tokens. Additionally, a purchaser’s failure to precisely follow the
        procedures for buying and receiving CRSS & sCRSS tokens, including, for instance, providing the wrong wallet or
        vault address for receiving CRSS & sCRSS tokens, could result in such purchaser’s effective loss of CRSS & sCRSS
        tokens.
      </ContentText>

      <SubTopic>
        Risks Associated with the BNB Chain Protocol (BNB) or other Blockchain Protocol that runs CRSS & sCRSS Token.
      </SubTopic>
      <ContentText>
        CRSS & sCRSS tokens are based on the BNB Chain. As such, any malfunction, unintended function, unexpected
        functioning, forking, breakdown or abandonment in the BNB Chain protocol or other Blockchain protocol, or any
        attack on such, could cause CRSS & sCRSS tokens to malfunction or function in an unexpected or unintended
        manner, including, but not limited to, impacting your ability to transfer or securely hold CRSS & sCRSS tokens.
        Such impact could adversely affect the value of CRSS & sCRSS tokens. Furthermore, advances in cryptography or
        other technical advances, such as the development of quantum computing, could present risks to CRSS & sCRSS
        tokens by rendering ineffective the cryptographic consensus mechanism that underpins the BNB Chain protocol or
        other blockchain protocol.
      </ContentText>

      <SubTopic>Risk of Hacking and Security Weaknesses</SubTopic>
      <ContentText>
        Hackers and other malicious groups or organizations may attempt to interfere with the functioning and ownership
        of CRSS & sCRSS tokens in a variety of ways, including, but not limited to, undertaking malware attacks, denial
        of service attacks, consensus-based attacks, Sybil attacks, smurfing and spoofing. Furthermore, because CRSS &
        sCRSS tokens are based on open-source software, there is a risk that a third-party or a member of Crosswise Labs
        team could intentionally or unintentionally introduce weaknesses into CRSS & sCRSS tokens which could in turn be
        exploited by such groups. It may be difficult for Crosswise Labs to maintain or develop CRSS & sCRSS tokens to
        address emerging issues or malicious programs that develop adequately or in a timely manner, and Crosswise Labs
        may not have adequate resources to do so. Such events could result in a loss of trust in the security and
        operation of CRSS & sCRSS tokens, which could materially adversely affect the value of CRSS & sCRSS tokens and
        the ownership thereof.
      </ContentText>

      <SubTopic>Risk of Theft of Funds Raised in the Token Generation Event</SubTopic>
      <ContentText>
        Crosswise Labs will make every effort to ensure that the funds received from the CRSS & sCRSS token sale will be
        securely held. Notwithstanding such security measures, there is no assurance that there will be no theft of the
        cryptocurrencies as a result of hacks, sophisticated cyber-attacks, distributed denials of service or errors,
        vulnerabilities or defects on Crosswise Labs website, in the smart contract(s) on which the escrow wallet and
        the CRSS & sCRSS token sale relies, on BNB Chain or any other blockchain, or otherwise.
        <br />
        <br />
        Such events may include, for example, flaws in programming or source code leading to exploitation or abuse
        thereof. In such event, even if the CRSS & sCRSS token sale is completed, Crosswise Labs may not be able to
        receive the cryptocurrencies raised. In such case, the Crosswise.Finance platform and any associated plans might
        be temporarily or permanently curtailed. As such, distributed CRSS & sCRSS tokens may hold little worth or
        value.
      </ContentText>

      <SubTopic>Risk of Unfavorable Regulatory Intervention in One or More Jurisdictions</SubTopic>
      <ContentText>
        Blockchain technologies and cryptocurrencies are relatively recent technologies which have developed rapidly and
        have been rolled out into numerous applications. This evolution has presented novel issues in terms of the
        classification, regulation and control of these technologies. As a result, it is often unclear what, if any,
        regulatory regime is applicable to blockchain technologies and cryptocurrencies.
        <br />
        <br />
        As the popularity of blockchain technologies and cryptocurrencies, as well as the aggregate capitalization of
        cryptocurrencies, have grown, blockchain technologies have come under the scrutiny of various regulatory bodies
        around the world, and in some cases initiated efforts to regulate, their use and operation.
        <br />
        <br />
        In light of this evolving technological and legal landscape, the regulation of tokens (including CRSS & sCRSS
        tokens), token offerings, cryptocurrencies, blockchain technologies, and cryptocurrency exchanges is likely to
        continue to evolve rapidly, to vary significantly among international jurisdictions and regulatory bodies, and
        to be subject to significant uncertainty. Going forward, various legislative, executive, and regulatory bodies
        in countries could adopt laws, regulations or guidance, or take other actions, which could materially negatively
        impact the functioning, use or legality of CRSS & sCRSS tokens. For example, regulatory inquiries or actions,
        including the imposition of licensing requirements or restrictions on the use, sale, or possession of digital
        tokens such as CRSS & sCRSS tokens, could impede, limit or terminate the development of the tokens.
        <br />
        <br />
        Furthermore, any failure by Crosswise Labs, purchasers of CRSS & sCRSS tokens or related parties to comply with
        any laws, rules, and regulations, some of which may not yet exist or may be subject to uncertain or varying
        interpretation, and which may be subject to change, could result in a variety of adverse consequences for such
        parties, including civil penalties and fines.
        <br />
        <br />
        The regulatory landscape of blockchain technologies and cryptocurrencies is also uncertain and varied. Various
        jurisdictions could, in the near future, adopt laws, regulations or directives that affect CRSS & sCRSS tokens.
        Such laws, regulations or directives may negatively and impact Crosswise Labs business. The effect of any future
        regulatory change is impossible to predict and could have a material adverse effect on Crosswise Labs, the value
        of the tokens and holders tokens.
        <br />
        <br />
        New or changing laws and regulations, or interpretations of existing laws and regulations, could also materially
        adversely affect the value of currencies into which CRSS & sCRSS tokens may be exchanged, the liquidity of the
        tokens, the ability to access marketplaces or exchanges to trade the tokens and the structure, use and
        transferability of the tokens. Crosswise Labs may choose to cease operations in a particular jurisdiction in the
        event that regulatory actions, or changes to law or regulation, make it illegal to operate in such jurisdiction,
        or commercially undesirable to obtain the necessary regulatory approvals to operate in such jurisdiction.
      </ContentText>

      <SubTopic>Risks Inherent in the Interoperable Nature of Cryptographic Tokens</SubTopic>
      <ContentText>
        Cryptographic tokens, especially those built on the BNB Chain, such as CRSS & sCRSS tokens, are generally
        tradable on exchanges or through direct peer-to-peer trading protocols that are not currently regulated by any
        governmental authority in a manner that traditional stock or equity interests are regulated. Therefore,
        purchasers of CRSS & sCRSS tokens are not afforded any of the protections of laws or regulations that purchasers
        of traditional shares or equity would enjoy. Additionally, Crosswise Labs has included transfer restrictions as
        a condition for the purchase of any CRSS & sCRSS tokens, but, due to the interoperability of BNB Chain tokens,
        such as CRSS & sCRSS tokens, Crosswise Labs may not be able to effectively enforce such restrictions and may be
        unable to prevent the negative consequences of unauthorized CRSS & sCRSS token transfers and potentially subject
        Crosswise Labs to regulatory fines, actions or registration requirements.
      </ContentText>

      <SubTopic>Risks Associated with Cryptocurrency Exchanges</SubTopic>
      <ContentText>
        Cryptocurrency exchanges on which CRSS & sCRSS tokens may trade may be relatively new and largely unregulated
        and may therefore be more exposed to fraud and failure than established regulated exchanges. To the extent that
        the cryptocurrency exchanges representing a substantial portion of the volume in CRSS & sCRSS token trading are
        involved in fraud or experience security failures or other operational issues, such cryptocurrency exchange
        failures may result in a reduction in the price and can adversely affect the value of the tokens. A lack of
        stability in cryptocurrency exchanges and the closure or temporary shutdown of cryptocurrency exchanges due to
        fraud, business failure, hackers or malware, or government-mandated regulation may result in greater volatility
        in the price of the tokens.
      </ContentText>

      <SubTopic>Risks Related to Future Sales or Issuance of CRSS & sCRSS tokens</SubTopic>
      <ContentText>
        Any future sale or issuance of the CRSS & sCRSS tokens would increase the supply of CRSS & sCRSS tokens in the
        market and this may result in a downward price pressure on the CRSS & sCRSS tokens. The sale or distribution of
        a significant number of CRSS & sCRSS tokens outside of the token generation event (including but not limited to
        the sales of CRSS & sCRSS tokens undertaken after the completion of the pre-sale and issuance of CRSS & sCRSS
        tokens to persons other than purchasers for purposes outlined in the whitepaper), or the perception that such
        further sales or issuance may occur, could adversely affect the trading price of CRSS & sCRSS tokens.
      </ContentText>

      <SubTopic>Risks Related to Token Taxation</SubTopic>
      <ContentText>
        The tax characterization of CRSS & sCRSS tokens in the United States and elsewhere is uncertain. Purchasers of
        the tokens must seek their own tax advice in connection with purchasing, holding and selling the tokens, which
        may result in adverse tax consequences, including withholding taxes, increased income tax liability and
        additional tax reporting requirements. Purchasers of the tokens should consult with and must rely upon the
        advice of their own professional tax advisors with respect to the U.S. and non-U.S. tax treatment of their
        receipt, purchase, holding and sale of the tokens.
      </ContentText>

      <SubTopic>Risk of Negative Publicity</SubTopic>
      <ContentText>
        Negative publicity involving Crosswise Labs, CRSS & sCRSS tokens, or any of the key personnel of Crosswise Labs,
        regulation of cryptocurrencies in the U.S. or worldwide, may materially and adversely affect the market
        perception or market price of the CRSS & sCRSS token, whether or not it is justified.
      </ContentText>

      <SubTopic>Risk of Personal Information Disclosure</SubTopic>
      <ContentText>
        Crosswise Labs may determine, in its sole discretion, that it is necessary to obtain certain information about a
        purchaser of CRSS & sCRSS tokens in order to comply with applicable law or regulation in connection with selling
        CRSS & sCRSS tokens to such purchaser. A purchaser may be asked to provide such information upon request, and
        Crosswise Labs may refuse to sell CRSS & sCRSS tokens to such purchaser until they provide the requested
        information and Crosswise Labs has determined that it is permissible to sell CRSS & sCRSS tokens to them under
        applicable law or regulation. Crosswise Labs will take reasonable measures to ensure that any such disclosed
        personal information is maintained confidentially and/or destroyed as applicable, but where such information is
        transmitted or stored electronically, there is a risk of its unintentional disclosure to third parties as a
        result of hacking, accidental disclosure or disclosure demanded by governmental authorities.
      </ContentText>

      <SubTopic>Risk of Uninsured Losses</SubTopic>
      <ContentText>
        Unlike bank accounts or accounts at certain other financial institutions, CRSS & sCRSS tokens are uninsured as a
        store of value unless a purchaser specifically obtains private insurance to insure them. Thus, in the event of
        loss or loss of value of CRSS & sCRSS tokens, there is no public insurer, such as the Federal Deposit Insurance
        Corporation, or private insurance arranged by Crosswise Labs, to offer recourse to a purchaser of CRSS & sCRSS
        tokens.
      </ContentText>

      <SubTopic>Unanticipated Risks</SubTopic>
      <ContentText>
        Cryptographic tokens are a new and untested technology. In addition to the risks discussed here there are risks
        that Crosswise Labs cannot anticipate. Further risks may materialize as unanticipated combinations or variations
        of the aforementioned risks, or yet unforeseen risks, develop. Such risks could have unanticipated consequences,
        including a material adverse impact on the value of CRSS & sCRSS tokens or the ownership thereof.
      </ContentText>
    </Page>
  )
}

export default Terms
