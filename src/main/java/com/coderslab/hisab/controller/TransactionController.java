/**
 * 
 */
package com.coderslab.hisab.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.coderslab.hisab.model.Transaction;
import com.coderslab.hisab.service.TransactionService;

/**
 * @author Zubayer Ahamed
 *
 */
@Controller
@RequestMapping("/transaction")
public class TransactionController extends HishabController{
	private static final Logger logger = LoggerFactory.getLogger(TransactionController.class);

	@Autowired TransactionService transactionService;

	@PostMapping("/save")
	public ResponseEntity<String> saveTransaction(Transaction transaction) {
		logger.info("Transaction {}", transaction);
		return new ResponseEntity<>("Transaction successfull", HttpStatus.OK);
	}
}
