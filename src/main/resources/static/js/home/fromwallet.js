/**
 * Global namespace 'cl' for CodersLab Bangladesh Ltd
 */
var cl = cl || {};
/**
 * Hishab namespace
 */
cl.hishab = cl.hishab || {};
/**
 * from and to Wallet name space
 */
cl.hishab.wallet = cl.hishab.wallet || {};
cl.hishab.wallet.allWallets;

cl.hishab.wallet.resetModal = function(){
	resetForm('wallet-form');
	$('.wallet-save').html("Save");
	$('.wallet-modal-title').html("Add Your Wallet");
	$('#currentBalance').val("0");
}

$(document).ready(function() {

	$('.addWalletButton').on('click', function(){
		$('#transactionModal').css('display', 'none');
	});
	$('.wallet-discard, #wallet-modal2-close').on('click', function(){
		$('#transactionModal').css('display', 'block');
	});

	/*
	 * Find All Wallets
	 */
	cl.hishab.wallet.getAllWallets = function(){
		var url = '/wallet/findAll';
		$.get(url, function(data) {
			cl.hishab.wallet.allWallets = data;
			cl.hishab.wallet.updateWalletDropdown();
		});
	}
	

	$('.wallet-save').on('click', function(){
		var formName = 'wallet-form';
		var formData = $('.' + formName).serializeArray();
		var status = ValidateForm(formName);
		var submitUrl = $('.' + formName).attr('action');
		if(status == true){
			$.post(submitUrl, formData, function(data, status){
				if(status == 'success'){
					showMessage('alert-success', data);
					cl.hishab.wallet.resetModal();
					$('#walletModal .close').click();
					$('#transactionModal').css('display', 'block');
					cl.hishab.wallet.getAllWallets();
				}
			});
		}
	});

	cl.hishab.wallet.updateWalletDropdown = function(){
		$('.transaction-form #fromWalletId option').remove();
		$('.transaction-form #toWalletId option').remove();
		var fromWalletDropdown = $('.transaction-form #fromWalletId');
		var toWalletDropdown = $('.transaction-form #toWalletId');
		cl.hishab.wallet.allWallets.forEach(function(item, index){
			fromWalletDropdown.append('<option value="' + item.walletId + '">'+ item.walletName +'</option>');
			toWalletDropdown.append('<option value="' + item.walletId + '">'+ item.walletName +'</option>');
		});
	}

});