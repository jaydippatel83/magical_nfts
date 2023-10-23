// This file is auto-generated from the CIDL source.
// Editing this file directly is not recommended as it may be overwritten.

use std::str::FromStr;
use borsh::BorshSerialize;
use solana_program::account_info::{AccountInfo, next_account_info, next_account_infos};
use solana_program::borsh0_10::try_from_slice_unchecked;
use solana_program::entrypoint::ProgramResult;
use solana_program::program::{invoke, invoke_signed};
use solana_program::pubkey::Pubkey;
use solana_program::rent::Rent;
use solana_program::system_instruction::create_account;
use solana_program::{msg, system_program};
use solana_program::sysvar::Sysvar;
use solana_program::program_pack::Pack;
use crate::generated::errors::NftError;
use crate::generated::instructions::NftInstruction;

use crate::generated::state::{
	Account,
	AccountPDA,
	MagicalNftMetadata,
};
use crate::src::*;

pub struct Processor;

impl Processor {
    pub fn process(
        program_id: &Pubkey,
        accounts: &[AccountInfo],
        data: &[u8],
    ) -> ProgramResult {
        let instruction = NftInstruction::unpack(data)?;

        match instruction {
			NftInstruction::Mint(args) => {
				msg!("Instruction: Mint");
				Self::process_mint(
					program_id,
					accounts, 
					args.name,
					args.symbol,
					args.image,
					args.animation_url,
					args.external_url,
					args.description,
					args.category,
				)
			}
			NftInstruction::Transfer => {
				msg!("Instruction: Transfer");
				Self::process_transfer(program_id, accounts)
			}
        }
    }

/// Accounts:
/// 0. `[writable, signer]` fee_payer: [AccountInfo] Auto-generated, default fee payer
/// 1. `[writable, signer]` mint: [Mint] 
/// 2. `[writable]` metadata: [MagicalNftMetadata] 
/// 3. `[]` system_program: [AccountInfo] Auto-generated, for account initialization
/// 4. `[writable, signer]` funding: [AccountInfo] Funding account (must be a system account)
/// 5. `[writable]` assoc_token_account: [AccountInfo] Associated token account address to be created
/// 6. `[]` wallet: [AccountInfo] Wallet address for the new associated token account
/// 7. `[]` token_program: [AccountInfo] SPL Token program
/// 8. `[signer]` owner: [AccountInfo] The mint's minting authority.
/// 9. `[]` csl_spl_token_v_0_0_0: [AccountInfo] Auto-generated, CslSplTokenProgram v0.0.0
/// 10. `[]` csl_spl_assoc_token_v_0_0_0: [AccountInfo] Auto-generated, CslSplAssocTokenProgram v0.0.0
///
/// Data:
/// - name: [String] 
/// - symbol: [String] 
/// - image: [String] 
/// - animation_url: [String] 
/// - external_url: [String] 
/// - description: [String] type
/// - category: [String] 
	pub fn process_mint(
		program_id: &Pubkey,
		accounts: &[AccountInfo],
		name: String,
		symbol: String,
		image: String,
		animation_url: String,
		external_url: String,
		description: String,
		category: String,
	) -> ProgramResult {
		let account_info_iter = &mut accounts.iter();
		let fee_payer_info = next_account_info(account_info_iter)?;
		let mint_info = next_account_info(account_info_iter)?;
		let metadata_info = next_account_info(account_info_iter)?;
		let system_program_info = next_account_info(account_info_iter)?;
		let funding_info = next_account_info(account_info_iter)?;
		let assoc_token_account_info = next_account_info(account_info_iter)?;
		let wallet_info = next_account_info(account_info_iter)?;
		let token_program_info = next_account_info(account_info_iter)?;
		let owner_info = next_account_info(account_info_iter)?;
		let csl_spl_token_v_0_0_0_info = next_account_info(account_info_iter)?;
		let csl_spl_assoc_token_v_0_0_0_info = next_account_info(account_info_iter)?;

		// Derive PDAs
		let (metadata_pubkey, metadata_bump) = Pubkey::find_program_address(
			&[b"metadata", mint_info.key.as_ref()],
			program_id,
		);

		// Security Checks
		if fee_payer_info.is_signer != true {
			return Err(NftError::InvalidSignerPermission.into());
		}

		if mint_info.is_signer != true {
			return Err(NftError::InvalidSignerPermission.into());
		}

		if *metadata_info.key != metadata_pubkey {
			return Err(NftError::NotExpectedAddress.into());
		}

		if *system_program_info.key != Pubkey::from_str("11111111111111111111111111111111").unwrap() {
			return Err(NftError::NotExpectedAddress.into());
		}

		if funding_info.is_signer != true {
			return Err(NftError::InvalidSignerPermission.into());
		}

		if *token_program_info.key != Pubkey::from_str("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA").unwrap() {
			return Err(NftError::NotExpectedAddress.into());
		}

		if owner_info.is_signer != true {
			return Err(NftError::InvalidSignerPermission.into());
		}

		if *csl_spl_token_v_0_0_0_info.key != Pubkey::from_str("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA").unwrap() {
			return Err(NftError::NotExpectedAddress.into());
		}

		if *csl_spl_assoc_token_v_0_0_0_info.key != Pubkey::from_str("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL").unwrap() {
			return Err(NftError::NotExpectedAddress.into());
		}


		// Accounts Initializations
		let space = spl_token::state::Mint::LEN;
		let rent = Rent::get()?;
		let rent_minimum_balance = rent.minimum_balance(space);

		invoke(
			&create_account(
				&fee_payer_info.key,
				&mint_info.key,
				rent_minimum_balance,
				space as u64,
				&Pubkey::from_str("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA").unwrap(),
			),
			&[fee_payer_info.clone(), mint_info.clone()],
		)?;

		let space = MagicalNftMetadata::LEN;
		let rent = Rent::get()?;
		let rent_minimum_balance = rent.minimum_balance(space);

		invoke_signed(
			&create_account(
				&fee_payer_info.key,
				&metadata_info.key,
				rent_minimum_balance,
				space as u64,
				program_id,
			),
			&[fee_payer_info.clone(), metadata_info.clone()],
			&[&[b"metadata", mint_info.key.as_ref(), &[metadata_bump]]],
		)?;


		// Security Checks
		if *fee_payer_info.owner != Pubkey::from_str("11111111111111111111111111111111").unwrap() {
			return Err(NftError::WrongAccountOwner.into());
		}

		if *mint_info.owner != Pubkey::from_str("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA").unwrap() {
			return Err(NftError::WrongAccountOwner.into());
		}

		if *funding_info.owner != Pubkey::from_str("11111111111111111111111111111111").unwrap() {
			return Err(NftError::WrongAccountOwner.into());
		}

		if *wallet_info.owner != Pubkey::from_str("11111111111111111111111111111111").unwrap() {
			return Err(NftError::WrongAccountOwner.into());
		}

		if mint_info.data_len() != spl_token::state::Mint::LEN {
			return Err(NftError::InvalidAccountLen.into());
		}

		if metadata_info.data_len() != MagicalNftMetadata::LEN {
			return Err(NftError::InvalidAccountLen.into());
		}


		// Accounts Deserialization
		let mint = Account::new(
			&mint_info,
			spl_token::state::Mint::unpack_from_slice(&mint_info.data.borrow()).unwrap(),
		);
		let metadata = &mut AccountPDA::new(
			&metadata_info,
			try_from_slice_unchecked::<MagicalNftMetadata>(&metadata_info.data.borrow()).unwrap(),
			metadata_bump,
		);

		// Calling STUB
		mint::mint(
			program_id,
			&vec![
				mint_info,
			],
			&vec![
				funding_info,
				assoc_token_account_info,
				wallet_info,
				mint_info,
				system_program_info,
				token_program_info,
			],
			&vec![
				mint_info,
				assoc_token_account_info,
				owner_info,
				wallet_info,
				token_program_info,
			],
			&vec![
				mint_info,
				owner_info,
			],
			&mint,
			metadata,
			funding_info,
			assoc_token_account_info,
			wallet_info,
			owner_info,
			name,
			symbol,
			image,
			animation_url,
			external_url,
			description,
			category,
		)?;

		// Accounts Serialization
		metadata.data.serialize(&mut &mut metadata_info.data.borrow_mut()[..])?;
		
		Ok(())
	}

/// Accounts:
/// 0. `[writable, signer]` fee_payer: [AccountInfo] Auto-generated, default fee payer
/// 1. `[]` mint: [Mint] 
/// 2. `[writable]` metadata: [MagicalNftMetadata] 
/// 3. `[writable, signer]` funding: [AccountInfo] Funding account (must be a system account)
/// 4. `[writable]` assoc_token_account: [AccountInfo] Associated token account address to be created
/// 5. `[]` wallet: [AccountInfo] Wallet address for the new associated token account
/// 6. `[]` system_program: [AccountInfo] System program
/// 7. `[]` token_program: [AccountInfo] SPL Token program
/// 8. `[writable]` source: [AccountInfo] The source account.
/// 9. `[writable]` destination: [AccountInfo] The destination account.
/// 10. `[signer]` authority: [AccountInfo] The source account's owner/delegate.
/// 11. `[]` csl_spl_assoc_token_v_0_0_0: [AccountInfo] Auto-generated, CslSplAssocTokenProgram v0.0.0
/// 12. `[]` csl_spl_token_v_0_0_0: [AccountInfo] Auto-generated, CslSplTokenProgram v0.0.0
	pub fn process_transfer(
		program_id: &Pubkey,
		accounts: &[AccountInfo],
	) -> ProgramResult {
		let account_info_iter = &mut accounts.iter();
		let fee_payer_info = next_account_info(account_info_iter)?;
		let mint_info = next_account_info(account_info_iter)?;
		let metadata_info = next_account_info(account_info_iter)?;
		let funding_info = next_account_info(account_info_iter)?;
		let assoc_token_account_info = next_account_info(account_info_iter)?;
		let wallet_info = next_account_info(account_info_iter)?;
		let system_program_info = next_account_info(account_info_iter)?;
		let token_program_info = next_account_info(account_info_iter)?;
		let source_info = next_account_info(account_info_iter)?;
		let destination_info = next_account_info(account_info_iter)?;
		let authority_info = next_account_info(account_info_iter)?;
		let csl_spl_assoc_token_v_0_0_0_info = next_account_info(account_info_iter)?;
		let csl_spl_token_v_0_0_0_info = next_account_info(account_info_iter)?;

		// Derive PDAs
		let (metadata_pubkey, metadata_bump) = Pubkey::find_program_address(
			&[b"metadata", mint_info.key.as_ref()],
			program_id,
		);

		// Security Checks
		if fee_payer_info.is_signer != true {
			return Err(NftError::InvalidSignerPermission.into());
		}

		if *metadata_info.key != metadata_pubkey {
			return Err(NftError::NotExpectedAddress.into());
		}

		if funding_info.is_signer != true {
			return Err(NftError::InvalidSignerPermission.into());
		}

		if *system_program_info.key != Pubkey::from_str("11111111111111111111111111111111").unwrap() {
			return Err(NftError::NotExpectedAddress.into());
		}

		if *token_program_info.key != Pubkey::from_str("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA").unwrap() {
			return Err(NftError::NotExpectedAddress.into());
		}

		if authority_info.is_signer != true {
			return Err(NftError::InvalidSignerPermission.into());
		}

		if *csl_spl_assoc_token_v_0_0_0_info.key != Pubkey::from_str("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL").unwrap() {
			return Err(NftError::NotExpectedAddress.into());
		}

		if *csl_spl_token_v_0_0_0_info.key != Pubkey::from_str("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA").unwrap() {
			return Err(NftError::NotExpectedAddress.into());
		}



		// Security Checks
		if *fee_payer_info.owner != Pubkey::from_str("11111111111111111111111111111111").unwrap() {
			return Err(NftError::WrongAccountOwner.into());
		}

		if *mint_info.owner != Pubkey::from_str("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA").unwrap() {
			return Err(NftError::WrongAccountOwner.into());
		}

		if *funding_info.owner != Pubkey::from_str("11111111111111111111111111111111").unwrap() {
			return Err(NftError::WrongAccountOwner.into());
		}

		if *wallet_info.owner != Pubkey::from_str("11111111111111111111111111111111").unwrap() {
			return Err(NftError::WrongAccountOwner.into());
		}

		if mint_info.data_len() != spl_token::state::Mint::LEN {
			return Err(NftError::InvalidAccountLen.into());
		}

		if metadata_info.data_len() != MagicalNftMetadata::LEN {
			return Err(NftError::InvalidAccountLen.into());
		}


		// Accounts Deserialization
		let mint = Account::new(
			&mint_info,
			spl_token::state::Mint::unpack_from_slice(&mint_info.data.borrow()).unwrap(),
		);
		let metadata = &mut AccountPDA::new(
			&metadata_info,
			try_from_slice_unchecked::<MagicalNftMetadata>(&metadata_info.data.borrow()).unwrap(),
			metadata_bump,
		);

		// Calling STUB
		transfer::transfer(
			program_id,
			&vec![
				funding_info,
				assoc_token_account_info,
				wallet_info,
				mint_info,
				system_program_info,
				token_program_info,
			],
			&vec![
				source_info,
				mint_info,
				destination_info,
				authority_info,
			],
			&mint,
			metadata,
			funding_info,
			assoc_token_account_info,
			wallet_info,
			source_info,
			destination_info,
			authority_info,
		)?;

		// Accounts Serialization
		metadata.data.serialize(&mut &mut metadata_info.data.borrow_mut()[..])?;		
		Ok(())
	}
}